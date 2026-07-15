import assert from "node:assert/strict";
import { test } from "node:test";

import { validateContactMessage } from "../features/legal/contact-message";

test("validateContactMessage accepts and trims a valid message", () => {
  const result = validateContactMessage({
    email: " osoba@example.com ",
    message: " To jest sensowna wiadomość testowa. ",
    name: " Jakub ",
    privacyAccepted: true,
    subject: " Test ",
    website: " ",
  });

  assert.equal(result.ok, true);

  if (!result.ok) {
    throw new Error("Expected message to be valid.");
  }

  assert.deepEqual(result.data, {
    email: "osoba@example.com",
    message: "To jest sensowna wiadomość testowa.",
    name: "Jakub",
    privacyAccepted: true,
    subject: "Test",
    website: "",
  });
});

test("validateContactMessage reports field errors for invalid input", () => {
  const result = validateContactMessage({
    email: "nie-email",
    message: "krótko",
    name: "",
    privacyAccepted: false,
    subject: "",
  });

  assert.equal(result.ok, false);

  if (result.ok) {
    throw new Error("Expected message to be invalid.");
  }

  assert.deepEqual(Object.keys(result.fieldErrors).sort(), [
    "email",
    "message",
    "name",
    "privacyAccepted",
    "subject",
  ]);
});

test("validateContactMessage rejects non-object payloads", () => {
  const result = validateContactMessage(null);

  assert.equal(result.ok, false);

  if (result.ok) {
    throw new Error("Expected payload to be invalid.");
  }

  assert.equal(
    result.fieldErrors.message,
    "Nie udało się odczytać wiadomości. Spróbuj ponownie.",
  );
});
