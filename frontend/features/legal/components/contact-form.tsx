"use client";

import { FormEvent, useState } from "react";

import type {
  ContactFieldErrors,
  ContactFormResponse,
} from "@/features/legal/contact-message";
import { validateContactMessage } from "@/features/legal/contact-message";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  privacyAccepted: boolean;
  website: string;
};

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  privacyAccepted: false,
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const isSending = status === "sending";

  const updateField = (
    field: keyof ContactFormState,
    value: string | boolean,
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateContactMessage(form);

    if (!validation.ok) {
      setFieldErrors(validation.fieldErrors);
      setStatus("error");
      setStatusMessage("Sprawdź oznaczone pola i spróbuj ponownie.");
      return;
    }

    setStatus("sending");
    setStatusMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = (await response.json()) as ContactFormResponse;

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setStatus("error");
        setStatusMessage(
          result.message || "Nie udało się wysłać wiadomości. Spróbuj później.",
        );
        return;
      }

      setForm(initialFormState);
      setStatus("success");
      setStatusMessage(result.message);
    } catch {
      setStatus("error");
      setStatusMessage(
        "Nie udało się połączyć z formularzem. Spróbuj ponownie za chwilę.",
      );
    }
  };

  return (
    <form
      className="rounded-[2rem] border-2 border-ink bg-mint p-6 shadow-[8px_8px_0_#163b59] sm:p-8"
      onSubmit={submitForm}
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Strona internetowa</label>
        <input
          autoComplete="off"
          id="contact-website"
          name="website"
          onChange={(event) => updateField("website", event.currentTarget.value)}
          tabIndex={-1}
          type="text"
          value={form.website}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block" htmlFor="contact-name">
          <span className="font-bold text-ink">Imię</span>
          <input
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            aria-invalid={Boolean(fieldErrors.name)}
            autoComplete="name"
            className="mt-2 w-full rounded-2xl border-2 border-ink/15 bg-white px-4 py-3 outline-none focus:border-brand-dark"
            disabled={isSending}
            id="contact-name"
            name="name"
            onChange={(event) => updateField("name", event.currentTarget.value)}
            required
            type="text"
            value={form.name}
          />
          <FieldError id="contact-name-error" message={fieldErrors.name} />
        </label>
        <label className="block" htmlFor="contact-email">
          <span className="font-bold text-ink">E-mail</span>
          <input
            aria-describedby={
              fieldErrors.email ? "contact-email-error" : undefined
            }
            aria-invalid={Boolean(fieldErrors.email)}
            autoComplete="email"
            className="mt-2 w-full rounded-2xl border-2 border-ink/15 bg-white px-4 py-3 outline-none focus:border-brand-dark"
            disabled={isSending}
            id="contact-email"
            name="email"
            onChange={(event) => updateField("email", event.currentTarget.value)}
            required
            type="email"
            value={form.email}
          />
          <FieldError id="contact-email-error" message={fieldErrors.email} />
        </label>
      </div>

      <label className="mt-5 block" htmlFor="contact-subject">
        <span className="font-bold text-ink">Temat</span>
        <input
          aria-describedby={
            fieldErrors.subject ? "contact-subject-error" : undefined
          }
          aria-invalid={Boolean(fieldErrors.subject)}
          className="mt-2 w-full rounded-2xl border-2 border-ink/15 bg-white px-4 py-3 outline-none focus:border-brand-dark"
          disabled={isSending}
          id="contact-subject"
          name="subject"
          onChange={(event) => updateField("subject", event.currentTarget.value)}
          required
          type="text"
          value={form.subject}
        />
        <FieldError id="contact-subject-error" message={fieldErrors.subject} />
      </label>

      <label className="mt-5 block" htmlFor="contact-message">
        <span className="font-bold text-ink">Wiadomość</span>
        <textarea
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
          aria-invalid={Boolean(fieldErrors.message)}
          className="mt-2 min-h-44 w-full resize-y rounded-2xl border-2 border-ink/15 bg-white px-4 py-3 outline-none focus:border-brand-dark"
          disabled={isSending}
          id="contact-message"
          name="message"
          onChange={(event) => updateField("message", event.currentTarget.value)}
          required
          value={form.message}
        />
        <FieldError id="contact-message-error" message={fieldErrors.message} />
      </label>

      <label className="mt-5 flex gap-3 text-sm leading-6 text-ink/70">
        <input
          checked={form.privacyAccepted}
          className="mt-1 h-5 w-5 accent-[#207f82]"
          disabled={isSending}
          onChange={(event) =>
            updateField("privacyAccepted", event.currentTarget.checked)
          }
          required
          type="checkbox"
        />
        <span>
          Rozumiem, że moje dane zostaną użyte do odpowiedzi na wiadomość.
          Wiadomość trafi do administratora strony.
        </span>
      </label>
      <FieldError
        id="contact-privacy-error"
        message={fieldErrors.privacyAccepted}
      />

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          className="button-primary disabled:cursor-not-allowed disabled:opacity-65"
          disabled={isSending}
          type="submit"
        >
          {isSending ? "Wysyłanie..." : "Wyślij wiadomość"}
        </button>
        {statusMessage ? (
          <p
            className={`text-sm font-bold leading-6 ${
              status === "success" ? "text-brand-dark" : "text-coral"
            }`}
            role="status"
          >
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function FieldError({
  id,
  message,
}: {
  id: string;
  message: string | undefined;
}) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 text-sm font-bold text-coral" id={id}>
      {message}
    </p>
  );
}
