import { siteConfig } from "@/config/site";
import type { ContactMessage } from "@/features/legal/contact-message";
import { validateContactMessage } from "@/features/legal/contact-message";
import { getSmtpOptions, sendSmtpEmail } from "@/lib/email/smtp";

export const runtime = "nodejs";

type DeliveryResult =
  | {
      ok: true;
      mode: "development" | "resend" | "smtp";
    }
  | {
      ok: false;
    };

type RateLimitBucket = {
  count: number;
  windowStartedAt: number;
};

type PayloadReadResult =
  | {
      ok: true;
      payload: unknown;
    }
  | {
      ok: false;
      response: Response;
    };

const contactMaxPayloadBytes = 16 * 1024;
const contactRateLimitWindowMs = 10 * 60 * 1000;
const contactRateLimitMaxAttempts = 5;
const contactRateLimitBuckets = new Map<string, RateLimitBucket>();
let lastRateLimitCleanupAt = 0;
const resendApiUrl = "https://api.resend.com/emails";

class PayloadTooLargeError extends Error {}

export async function POST(request: Request) {
  const payloadResult = await readJsonPayload(request);

  if (!payloadResult.ok) {
    return payloadResult.response;
  }

  const rateLimit = checkContactRateLimit(getClientIdentifier(request));

  if (!rateLimit.ok) {
    return Response.json(
      {
        ok: false,
        message:
          "Wysłano zbyt wiele wiadomości. Spróbuj ponownie za kilka minut.",
      },
      {
        headers: {
          "Retry-After": String(Math.ceil(rateLimit.retryAfterMs / 1000)),
        },
        status: 429,
      },
    );
  }

  const validation = validateContactMessage(payloadResult.payload);

  if (!validation.ok) {
    return Response.json(
      {
        ok: false,
        message: "Sprawdź oznaczone pola i spróbuj ponownie.",
        fieldErrors: validation.fieldErrors,
      },
      { status: 422 },
    );
  }

  if (validation.data.website) {
    return Response.json({
      ok: true,
      message: "Dzięki, wiadomość została przyjęta.",
    });
  }

  const delivery = await deliverContactMessage(validation.data);

  if (!delivery.ok) {
    return Response.json(
      {
        ok: false,
        message:
          "Formularz jest chwilowo niedostępny. Napisz bezpośrednio na adres e-mail ze strony kontaktu.",
      },
      { status: 503 },
    );
  }

  return Response.json({
    ok: true,
    message:
      delivery.mode === "development"
        ? "Wiadomość została przyjęta lokalnie. Jej treść jest w terminalu dev servera."
        : "Dzięki, wiadomość została wysłana.",
  });
}

async function readJsonPayload(request: Request): Promise<PayloadReadResult> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > contactMaxPayloadBytes) {
    return {
      ok: false,
      response: Response.json(
        {
          ok: false,
          message: "Wiadomość jest zbyt duża. Skróć treść i spróbuj ponownie.",
        },
        { status: 413 },
      ),
    };
  }

  try {
    const text = await readRequestBody(request);

    if (new TextEncoder().encode(text).byteLength > contactMaxPayloadBytes) {
      return {
        ok: false,
        response: Response.json(
          {
            ok: false,
            message:
              "Wiadomość jest zbyt duża. Skróć treść i spróbuj ponownie.",
          },
          { status: 413 },
        ),
      };
    }

    return {
      ok: true,
      payload: JSON.parse(text) as unknown,
    };
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return {
        ok: false,
        response: Response.json(
          {
            ok: false,
            message:
              "Wiadomość jest zbyt duża. Skróć treść i spróbuj ponownie.",
          },
          { status: 413 },
        ),
      };
    }

    return {
      ok: false,
      response: Response.json(
        {
          ok: false,
          message: "Nie udało się odczytać wiadomości. Spróbuj ponownie.",
        },
        { status: 400 },
      ),
    };
  }
}

async function readRequestBody(request: Request) {
  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  const chunks: string[] = [];
  let bytesRead = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    bytesRead += value.byteLength;

    if (bytesRead > contactMaxPayloadBytes) {
      await reader.cancel();
      throw new PayloadTooLargeError();
    }

    chunks.push(decoder.decode(value, { stream: true }));
  }

  chunks.push(decoder.decode());

  return chunks.join("");
}

function checkContactRateLimit(clientId: string) {
  const now = Date.now();
  cleanupRateLimitBuckets(now);

  const bucket = contactRateLimitBuckets.get(clientId);

  if (!bucket || now - bucket.windowStartedAt >= contactRateLimitWindowMs) {
    contactRateLimitBuckets.set(clientId, {
      count: 1,
      windowStartedAt: now,
    });
    return { ok: true as const };
  }

  if (bucket.count >= contactRateLimitMaxAttempts) {
    return {
      ok: false as const,
      retryAfterMs:
        contactRateLimitWindowMs - (now - bucket.windowStartedAt),
    };
  }

  bucket.count += 1;

  return { ok: true as const };
}

function cleanupRateLimitBuckets(now: number) {
  if (now - lastRateLimitCleanupAt < contactRateLimitWindowMs) {
    return;
  }

  lastRateLimitCleanupAt = now;

  for (const [clientId, bucket] of contactRateLimitBuckets) {
    if (now - bucket.windowStartedAt >= contactRateLimitWindowMs) {
      contactRateLimitBuckets.delete(clientId);
    }
  }
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedClient = forwardedFor?.split(",")[0]?.trim();

  return (
    forwardedClient ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown-client"
  );
}

async function deliverContactMessage(
  message: ContactMessage,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? siteConfig.contactEmail;

  // An explicitly configured SMTP account takes priority over Resend.
  // Never fall back to another provider after an SMTP failure (duplicate mail).
  if (process.env.SMTP_HOST || process.env.SMTP_USER || process.env.SMTP_PASSWORD) {
    try {
      const options = getSmtpOptions(process.env);
      await sendSmtpEmail(options, {
        from: fromEmail?.trim() || process.env.SMTP_USER!.trim(),
        to: toEmail,
        replyTo: message.email,
        subject: `Pixel na Warstwie: ${message.subject}`,
        text: formatEmailText(message),
        html: formatEmailHtml(message),
      });
      return { ok: true, mode: "smtp" };
    } catch (error) {
      // Do not log credentials, message contents or raw SMTP responses.
      const smtpError = error as { code?: string; responseCode?: number };
      console.error("Contact SMTP delivery failed", {
        code: smtpError.code ?? "SMTP_CONFIG_OR_DELIVERY_ERROR",
        responseCode: smtpError.responseCode,
      });
      return { ok: false };
    }
  }

  if (apiKey && fromEmail) {
    return sendWithResend({
      apiKey,
      fromEmail,
      message,
      toEmail,
    });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(formatDevelopmentLog(message, toEmail));
    return { ok: true, mode: "development" };
  }

  console.error(
    "Contact form delivery is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD, or RESEND_API_KEY and CONTACT_FROM_EMAIL.",
  );
  return { ok: false };
}

async function sendWithResend({
  apiKey,
  fromEmail,
  message,
  toEmail,
}: {
  apiKey: string;
  fromEmail: string;
  message: ContactMessage;
  toEmail: string;
}): Promise<DeliveryResult> {
  try {
    const response = await fetch(resendApiUrl, {
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from: fromEmail,
        html: formatEmailHtml(message),
        reply_to: message.email,
        subject: `Pixel na Warstwie: ${message.subject}`,
        text: formatEmailText(message),
        to: [toEmail],
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend contact email failed:", error);
      return { ok: false };
    }

    return { ok: true, mode: "resend" };
  } catch (error) {
    console.error("Contact email request failed:", error);
    return { ok: false };
  }
}

function formatDevelopmentLog(message: ContactMessage, toEmail: string) {
  return [
    "[contact-form:local]",
    `Do: ${toEmail}`,
    `Od: ${message.name} <${message.email}>`,
    `Temat: ${message.subject}`,
    "",
    message.message,
  ].join("\n");
}

function formatEmailText(message: ContactMessage) {
  return [
    "Nowa wiadomość z formularza kontaktowego Pixel na Warstwie.",
    "",
    `Imię: ${message.name}`,
    `E-mail: ${message.email}`,
    `Temat: ${message.subject}`,
    "",
    message.message,
  ].join("\n");
}

function formatEmailHtml(message: ContactMessage) {
  return `
    <h1>Nowa wiadomość z formularza kontaktowego</h1>
    <p><strong>Imię:</strong> ${escapeHtml(message.name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(message.email)}</p>
    <p><strong>Temat:</strong> ${escapeHtml(message.subject)}</p>
    <hr />
    <p>${escapeHtml(message.message).replaceAll("\n", "<br />")}</p>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
