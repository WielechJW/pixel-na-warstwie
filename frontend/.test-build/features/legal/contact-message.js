"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContactMessage = validateContactMessage;
const contactLimits = {
    name: 80,
    email: 160,
    subject: 140,
    message: 3000,
};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateContactMessage(input) {
    if (!isRecord(input)) {
        return {
            ok: false,
            fieldErrors: {
                message: "Nie udało się odczytać wiadomości. Spróbuj ponownie.",
            },
        };
    }
    const data = {
        name: readTrimmedString(input.name),
        email: readTrimmedString(input.email),
        subject: readTrimmedString(input.subject),
        message: readTrimmedString(input.message),
        privacyAccepted: input.privacyAccepted === true,
        website: readTrimmedString(input.website),
    };
    const fieldErrors = {};
    if (!data.name) {
        fieldErrors.name = "Podaj imię.";
    }
    else if (data.name.length > contactLimits.name) {
        fieldErrors.name = `Imię może mieć maksymalnie ${contactLimits.name} znaków.`;
    }
    if (!data.email) {
        fieldErrors.email = "Podaj adres e-mail.";
    }
    else if (data.email.length > contactLimits.email) {
        fieldErrors.email = `E-mail może mieć maksymalnie ${contactLimits.email} znaków.`;
    }
    else if (!emailPattern.test(data.email)) {
        fieldErrors.email = "Podaj poprawny adres e-mail.";
    }
    if (!data.subject) {
        fieldErrors.subject = "Podaj temat wiadomości.";
    }
    else if (data.subject.length > contactLimits.subject) {
        fieldErrors.subject = `Temat może mieć maksymalnie ${contactLimits.subject} znaków.`;
    }
    if (!data.message) {
        fieldErrors.message = "Wpisz treść wiadomości.";
    }
    else if (data.message.length < 10) {
        fieldErrors.message = "Wiadomość powinna mieć co najmniej 10 znaków.";
    }
    else if (data.message.length > contactLimits.message) {
        fieldErrors.message = `Wiadomość może mieć maksymalnie ${contactLimits.message} znaków.`;
    }
    if (!data.privacyAccepted) {
        fieldErrors.privacyAccepted =
            "Potwierdź zgodę na wykorzystanie danych do odpowiedzi.";
    }
    if (Object.keys(fieldErrors).length > 0) {
        return { ok: false, fieldErrors };
    }
    return {
        ok: true,
        data: {
            ...data,
            privacyAccepted: true,
        },
    };
}
function isRecord(value) {
    return typeof value === "object" && value !== null;
}
function readTrimmedString(value) {
    return typeof value === "string" ? value.trim() : "";
}
