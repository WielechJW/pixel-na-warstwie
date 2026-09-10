import assert from "node:assert/strict";
import { createServer } from "node:net";
import { test } from "node:test";
import { getSmtpOptions, sendSmtpEmail } from "../lib/email/smtp";

const env = { SMTP_HOST: "mail.example.test", SMTP_USER: "contact@example.test", SMTP_PASSWORD: "test-only" };

test("SMTP uses TLS on 465 and mandatory STARTTLS on 587", () => {
  assert.equal(getSmtpOptions(env).secure, true);
  const options = getSmtpOptions({ ...env, SMTP_PORT: "587" });
  assert.equal(options.secure, false);
  assert.equal(options.requireTLS, true);
});

test("SMTP rejects missing credentials and unsupported ports", () => {
  assert.throws(() => getSmtpOptions({ ...env, SMTP_PASSWORD: "" }));
  assert.throws(() => getSmtpOptions({ ...env, SMTP_PORT: "25" }));
});

// Local SMTP sink: no messages leave this machine.
async function withSmtpServer(reject: boolean, run: (port: number, messages: string[]) => Promise<void>) {
  const messages: string[] = [];
  const server = createServer((socket) => {
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
          } else message += line + "\r\n";
        } else if (line.startsWith("DATA")) {
          data = true;
          socket.write("354 send data\r\n");
        } else if (line.startsWith("QUIT")) socket.end("221 bye\r\n");
        else if (line.startsWith("RCPT") && reject) socket.write("550 recipient rejected\r\n");
        else socket.write("250 OK\r\n");
      }
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    await run(address.port, messages);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

const mail = {
  from: "contact@example.test", to: "owner@example.test", replyTo: "visitor@example.test",
  subject: "Contact test", text: "Test message", html: "<p>Test message</p>",
};

test("SMTP delivers message with mailbox sender and visitor Reply-To", { timeout: 10_000 }, async () => {
  await withSmtpServer(false, async (port, messages) => {
    await sendSmtpEmail({ host: "127.0.0.1", port, secure: false, ignoreTLS: true }, mail);
    assert.equal(messages.length, 1);
    assert.match(messages[0], /From: contact@example.test/);
    assert.match(messages[0], /Reply-To: visitor@example.test/);
    assert.match(messages[0], /To: owner@example.test/);
  });
});

test("SMTP rejection is reported as failure", { timeout: 10_000 }, async () => {
  await withSmtpServer(true, async (port, messages) => {
    await assert.rejects(sendSmtpEmail({ host: "127.0.0.1", port, secure: false, ignoreTLS: true }, mail));
    assert.equal(messages.length, 0);
  });
});
