"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const cookie_consent_1 = require("../features/legal/cookie-consent");
const globalScope = globalThis;
const originalWindow = globalScope.window;
(0, node_test_1.afterEach)(() => {
    if (originalWindow === undefined) {
        delete globalScope.window;
        return;
    }
    globalScope.window = originalWindow;
});
(0, node_test_1.test)("parseCookieConsent accepts only complete consent values", () => {
    strict_1.default.deepEqual((0, cookie_consent_1.parseCookieConsent)(JSON.stringify({
        analytics: true,
        necessary: true,
        updatedAt: "2026-07-15T12:00:00.000Z",
    })), {
        analytics: true,
        necessary: true,
        updatedAt: "2026-07-15T12:00:00.000Z",
    });
    strict_1.default.equal((0, cookie_consent_1.parseCookieConsent)("not-json"), null);
    strict_1.default.equal((0, cookie_consent_1.parseCookieConsent)(JSON.stringify({ analytics: true })), null);
});
(0, node_test_1.test)("saveCookieConsent returns a consent object without browser APIs", () => {
    delete globalScope.window;
    const consent = (0, cookie_consent_1.saveCookieConsent)(false);
    strict_1.default.equal(consent.analytics, false);
    strict_1.default.equal(consent.necessary, true);
    strict_1.default.equal((0, cookie_consent_1.readCookieConsentSnapshot)(), "");
});
(0, node_test_1.test)("saveCookieConsent writes to localStorage and notifies subscribers", () => {
    const browser = createBrowserMock();
    globalScope.window = browser;
    let updates = 0;
    const unsubscribe = (0, cookie_consent_1.subscribeToCookieConsentChanges)(() => {
        updates += 1;
    });
    const consent = (0, cookie_consent_1.saveCookieConsent)(true);
    strict_1.default.equal(consent.analytics, true);
    strict_1.default.equal(updates, 1);
    strict_1.default.deepEqual((0, cookie_consent_1.parseCookieConsent)((0, cookie_consent_1.readCookieConsentSnapshot)()), consent);
    unsubscribe();
});
function createBrowserMock() {
    const eventTarget = new EventTarget();
    const storage = new Map();
    return {
        addEventListener: eventTarget.addEventListener.bind(eventTarget),
        dispatchEvent: eventTarget.dispatchEvent.bind(eventTarget),
        localStorage: {
            getItem(key) {
                return storage.get(key) ?? null;
            },
            setItem(key, value) {
                storage.set(key, value);
            },
        },
        removeEventListener: eventTarget.removeEventListener.bind(eventTarget),
    };
}
