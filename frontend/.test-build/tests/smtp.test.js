"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_net_1 = require("node:net");
const node_test_1 = require("node:test");
const smtp_1 = require("../lib/email/smtp");
const env = { SMTP_HOST: "mail.example.test", SMTP_USER: "contact@example.test", SMTP_PASSWORD: "test-only" };
(0, node_test_1.test)("SMTP uses TLS on 465 and mandatory STARTTLS on 587", () => {
    strict_1.default.equal((0, smtp_1.getSmtpOptions)(env).secure, true);
    const options = (0, smtp_1.getSmtpOptions)({ ...env, SMTP_PORT: "587" });
    strict_1.default.equal(options.secure, false);
    strict_1.default.equal(options.requireTLS, true);
});
(0, node_test_1.test)("SMTP rejects missing credentials and unsupported ports", () => {
    strict_1.default.throws(() => (0, smtp_1.getSmtpOptions)({ ...env, SMTP_PASSWORD: "" }));
    strict_1.default.throws(() => (0, smtp_1.getSmtpOptions)({ ...env, SMTP_PORT: "25" }));
});
// Local SMTP sink: no messages leave this machine.
async function withSmtpServer(reject, run) {
    const messages = [];
    const server = (0, node_net_1.createServer)((socket) => {
        socket.setEncoding("utf8");
        socket.write("220 localhost test SMTP\r\n");
        let buffer = "";
        let data = false;
        let message = "";
        socket.on("data", (chunk) => {
            buffer += chunk;
            while (buffer.includes("\r\n")) {
                const index = buffer.indexOf("\r\n");
                const line = buffer.slice(0, index);
                buffer = buffer.slice(index + 2);
                if (data) {
                    if (line === ".") {
                        messages.push(message);
                        data = false;
                        socket.write("250 queued\r\n");
                    }
                    else
                        message += line + "\r\n";
                }
                else if (line.startsWith("DATA")) {
                    data = true;
                    socket.write("354 send data\r\n");
                }
                else if (line.startsWith("QUIT"))
                    socket.end("221 bye\r\n");
                else if (line.startsWith("RCPT") && reject)
                    socket.write("550 recipient rejected\r\n");
                else
                    socket.write("250 OK\r\n");
            }
        });
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    try {
        const address = server.address();
        strict_1.default.ok(address && typeof address !== "string");
        await run(address.port, messages);
    }
    finally {
        await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
}
const mail = {
    from: "contact@example.test", to: "owner@example.test", replyTo: "visitor@example.test",
    subject: "Contact test", text: "Test message", html: "<p>Test message</p>",
};
(0, node_test_1.test)("SMTP delivers message with mailbox sender and visitor Reply-To", { timeout: 10_000 }, async () => {
    await withSmtpServer(false, async (port, messages) => {
        await (0, smtp_1.sendSmtpEmail)({ host: "127.0.0.1", port, secure: false, ignoreTLS: true }, mail);
        strict_1.default.equal(messages.length, 1);
        strict_1.default.match(messages[0], /From: contact@example.test/);
        strict_1.default.match(messages[0], /Reply-To: visitor@example.test/);
        strict_1.default.match(messages[0], /To: owner@example.test/);
    });
});
(0, node_test_1.test)("SMTP rejection is reported as failure", { timeout: 10_000 }, async () => {
    await withSmtpServer(true, async (port, messages) => {
        await strict_1.default.rejects((0, smtp_1.sendSmtpEmail)({ host: "127.0.0.1", port, secure: false, ignoreTLS: true }, mail));
        strict_1.default.equal(messages.length, 0);
    });
});
