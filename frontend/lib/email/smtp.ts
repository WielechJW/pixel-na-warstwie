import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export function getSmtpOptions(env: Record<string, string | undefined>): SMTPTransport.Options {
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASSWORD;
  const port = Number(env.SMTP_PORT || "465");
  if (!host || !user || !pass) {
    throw new Error("Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD.");
  }
  if (port !== 465 && port !== 587) {
    throw new Error("SMTP_PORT must be 465 (TLS) or 587 (STARTTLS).");
  }
  return {
    host, port, secure: port === 465, requireTLS: true,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export async function sendSmtpEmail(
  options: SMTPTransport.Options,
  mail: { from: string; to: string; replyTo: string; subject: string; text: string; html: string },
) {
  const transport = nodemailer.createTransport(options);
  try {
    const result = await transport.sendMail(mail);
    if (result.accepted.length === 0 || result.rejected.length > 0) {
      throw new Error("SMTP recipient was not accepted.");
    }
  } finally {
    transport.close();
  }
}
