"use client";

import { FormEvent, useState } from "react";

import { Icon } from "@/components/ui/icon";
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

const inputClassName =
  "mt-2.5 w-full rounded-xl border border-ink/12 bg-cream/35 px-4 py-3.5 text-base text-ink outline-none transition-[border-color,background-color,box-shadow] placeholder:text-muted hover:border-ink/25 focus:border-brand-dark focus:bg-white focus:ring-4 focus:ring-brand/10 disabled:cursor-wait disabled:opacity-60 aria-invalid:border-error";

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
      className="rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_16px_60px_-30px] shadow-ink/20 sm:p-9"
      onSubmit={submitForm}
    >
      <div className="mb-8 border-b border-ink/10 pb-7">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Zostaw wiadomość
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Kilka słów wystarczy, żeby zacząć. Wszystkie pola są wymagane.
        </p>
      </div>
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

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block" htmlFor="contact-name">
          <span className="text-sm font-semibold text-ink">Imię</span>
          <input
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            aria-invalid={Boolean(fieldErrors.name)}
            autoComplete="name"
            className={inputClassName}
            disabled={isSending}
            id="contact-name"
            name="name"
            onChange={(event) => updateField("name", event.currentTarget.value)}
            placeholder="Jak masz na imię?"
            required
            type="text"
            value={form.name}
          />
          <FieldError id="contact-name-error" message={fieldErrors.name} />
        </label>
        <label className="block" htmlFor="contact-email">
          <span className="text-sm font-semibold text-ink">E-mail</span>
          <input
            aria-describedby={
              fieldErrors.email ? "contact-email-error" : undefined
            }
            aria-invalid={Boolean(fieldErrors.email)}
            autoComplete="email"
            className={inputClassName}
            disabled={isSending}
            id="contact-email"
            name="email"
            onChange={(event) => updateField("email", event.currentTarget.value)}
            placeholder="twoj@email.pl"
            required
            type="email"
            value={form.email}
          />
          <FieldError id="contact-email-error" message={fieldErrors.email} />
        </label>
      </div>

      <label className="mt-6 block" htmlFor="contact-subject">
        <span className="text-sm font-semibold text-ink">Temat</span>
        <input
          aria-describedby={
            fieldErrors.subject ? "contact-subject-error" : undefined
          }
          aria-invalid={Boolean(fieldErrors.subject)}
          className={inputClassName}
          disabled={isSending}
          id="contact-subject"
          name="subject"
          onChange={(event) => updateField("subject", event.currentTarget.value)}
          placeholder="O czym porozmawiamy?"
          required
          type="text"
          value={form.subject}
        />
        <FieldError id="contact-subject-error" message={fieldErrors.subject} />
      </label>

      <label className="mt-6 block" htmlFor="contact-message">
        <span className="text-sm font-semibold text-ink">Wiadomość</span>
        <textarea
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
          aria-invalid={Boolean(fieldErrors.message)}
          className={`${inputClassName} min-h-44 resize-y`}
          disabled={isSending}
          id="contact-message"
          name="message"
          onChange={(event) => updateField("message", event.currentTarget.value)}
          placeholder="Opisz swoje pytanie lub pomysł…"
          required
          value={form.message}
        />
        <FieldError id="contact-message-error" message={fieldErrors.message} />
      </label>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-6 text-muted sm:text-sm">
        <input
          aria-describedby={
            fieldErrors.privacyAccepted ? "contact-privacy-error" : undefined
          }
          aria-invalid={Boolean(fieldErrors.privacyAccepted)}
          checked={form.privacyAccepted}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-brand-dark"
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

      <div className="mt-7 flex flex-col gap-4">
        <button
          className="button-primary w-full gap-3 disabled:cursor-not-allowed disabled:opacity-65"
          disabled={isSending}
          type="submit"
        >
          {isSending ? "Wysyłanie..." : "Wyślij wiadomość"}
          {isSending ? (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
            />
          ) : (
            <Icon name="arrow-up-right" className="h-4 w-4" />
          )}
        </button>
        {statusMessage ? (
          <p
            className={`rounded-xl px-4 py-3 text-sm font-medium leading-6 ${
              status === "success" ? "bg-mint text-brand-dark" : "bg-coral/10 text-error"
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
    <p className="mt-2 text-sm font-medium text-error" id={id}>
      {message}
    </p>
  );
}
