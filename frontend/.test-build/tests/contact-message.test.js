"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const contact_message_1 = require("../features/legal/contact-message");
(0, node_test_1.test)("validateContactMessage accepts and trims a valid message", () => {
    const result = (0, contact_message_1.validateContactMessage)({
        email: " osoba@example.com ",
        message: " To jest sensowna wiadomość testowa. ",
        name: " Jakub ",
        privacyAccepted: true,
        subject: " Test ",
        website: " ",
    });
    strict_1.default.equal(result.ok, true);
    if (!result.ok) {
        throw new Error("Expected message to be valid.");
    }
    strict_1.default.deepEqual(result.data, {
        email: "osoba@example.com",
        message: "To jest sensowna wiadomość testowa.",
        name: "Jakub",
        privacyAccepted: true,
        subject: "Test",
        website: "",
    });
});
(0, node_test_1.test)("validateContactMessage reports field errors for invalid input", () => {
    const result = (0, contact_message_1.validateContactMessage)({
        email: "nie-email",
        message: "krótko",
        name: "",
        privacyAccepted: false,
        subject: "",
    });
    strict_1.default.equal(result.ok, false);
    if (result.ok) {
        throw new Error("Expected message to be invalid.");
    }
    strict_1.default.deepEqual(Object.keys(result.fieldErrors).sort(), [
        "email",
        "message",
        "name",
        "privacyAccepted",
        "subject",
    ]);
});
(0, node_test_1.test)("validateContactMessage rejects non-object payloads", () => {
    const result = (0, contact_message_1.validateContactMessage)(null);
    strict_1.default.equal(result.ok, false);
    if (result.ok) {
        throw new Error("Expected payload to be invalid.");
    }
    strict_1.default.equal(result.fieldErrors.message, "Nie udało się odczytać wiadomości. Spróbuj ponownie.");
});
