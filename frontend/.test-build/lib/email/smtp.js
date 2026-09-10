"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSmtpOptions = getSmtpOptions;
exports.sendSmtpEmail = sendSmtpEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
function getSmtpOptions(env) {
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
async function sendSmtpEmail(options, mail) {
    const transport = nodemailer_1.default.createTransport(options);
    try {
        const result = await transport.sendMail(mail);
        if (result.accepted.length === 0 || result.rejected.length > 0) {
            throw new Error("SMTP recipient was not accepted.");
        }
    }
    finally {
        transport.close();
    }
}
