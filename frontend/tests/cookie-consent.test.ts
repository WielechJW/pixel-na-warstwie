import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import {
  parseCookieConsent,
  readCookieConsentSnapshot,
  saveCookieConsent,
  subscribeToCookieConsentChanges,
} from "../features/legal/cookie-consent";

const globalScope = globalThis as {
  window?: unknown;
};
const originalWindow = globalScope.window;

afterEach(() => {
  if (originalWindow === undefined) {
    delete globalScope.window;
    return;
  }

  globalScope.window = originalWindow;
});

test("parseCookieConsent accepts only complete consent values", () => {
  assert.deepEqual(
    parseCookieConsent(
      JSON.stringify({
        analytics: true,
        necessary: true,
        updatedAt: "2026-07-15T12:00:00.000Z",
      }),
    ),
    {
      analytics: true,
      necessary: true,
      updatedAt: "2026-07-15T12:00:00.000Z",
    },
  );
  assert.equal(parseCookieConsent("not-json"), null);
  assert.equal(parseCookieConsent(JSON.stringify({ analytics: true })), null);
});

test("saveCookieConsent returns a consent object without browser APIs", () => {
  delete globalScope.window;

  const consent = saveCookieConsent(false);

  assert.equal(consent.analytics, false);
  assert.equal(consent.necessary, true);
  assert.equal(readCookieConsentSnapshot(), "");
});

test("saveCookieConsent writes to localStorage and notifies subscribers", () => {
  const browser = createBrowserMock();
  globalScope.window = browser;
  let updates = 0;
  const unsubscribe = subscribeToCookieConsentChanges(() => {
    updates += 1;
  });

  const consent = saveCookieConsent(true);

  assert.equal(consent.analytics, true);
  assert.equal(updates, 1);
  assert.deepEqual(parseCookieConsent(readCookieConsentSnapshot()), consent);

  unsubscribe();
});

function createBrowserMock() {
  const eventTarget = new EventTarget();
  const storage = new Map<string, string>();

  return {
    addEventListener: eventTarget.addEventListener.bind(eventTarget),
    dispatchEvent: eventTarget.dispatchEvent.bind(eventTarget),
    localStorage: {
      getItem(key: string) {
        return storage.get(key) ?? null;
      },
      setItem(key: string, value: string) {
        storage.set(key, value);
      },
    },
    removeEventListener: eventTarget.removeEventListener.bind(eventTarget),
  };
}
