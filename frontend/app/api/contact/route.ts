import { siteConfig } from "@/config/site";
import type { ContactMessage } from "@/features/legal/contact-message";
import { validateContactMessage } from "@/features/legal/contact-message";

type DeliveryResult =
  | {
      ok: true;
      mode: "development" | "resend";
    }
  | {
      ok: false;
    };

const resendApiUrl = "https://api.resend.com/emails";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      {
        ok: false,
        message: "Nie udało się odczytać wiadomości. Spróbuj ponownie.",
      },
      { status: 400 },
    );
  }

  const validation = validateContactMessage(payload);

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

async function deliverContactMessage(
  message: ContactMessage,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? siteConfig.contactEmail;

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
    "Contact form delivery is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.",
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
