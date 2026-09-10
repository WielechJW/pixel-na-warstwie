"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCookieConsent = saveCookieConsent;
exports.readCookieConsent = readCookieConsent;
exports.hasAnalyticsConsent = hasAnalyticsConsent;
exports.readCookieConsentSnapshot = readCookieConsentSnapshot;
exports.readServerCookieConsentSnapshot = readServerCookieConsentSnapshot;
exports.subscribeToCookieConsentChanges = subscribeToCookieConsentChanges;
exports.parseCookieConsent = parseCookieConsent;
exports.openCookieSettings = openCookieSettings;
exports.subscribeToCookieSettingsOpen = subscribeToCookieSettingsOpen;
const cookieConsentStorageKey = "pixel-na-warstwie-cookie-consent-v1";
const cookieConsentUpdatedEvent = "pixel-cookie-consent-updated";
const cookieSettingsOpenEvent = "pixel-open-cookie-settings";
function saveCookieConsent(analytics) {
    const consent = {
        necessary: true,
        analytics,
        updatedAt: new Date().toISOString(),
    };
    if (!isBrowser()) {
        return consent;
    }
    try {
        window.localStorage.setItem(cookieConsentStorageKey, JSON.stringify(consent));
    }
    catch {
        console.warn("Cookie consent could not be saved in localStorage.");
    }
    window.dispatchEvent(new CustomEvent(cookieConsentUpdatedEvent, {
        detail: consent,
    }));
    return consent;
}
function readCookieConsent() {
    return parseCookieConsent(readCookieConsentSnapshot());
}
function hasAnalyticsConsent() {
    return readCookieConsent()?.analytics === true;
}
function readCookieConsentSnapshot() {
    if (!isBrowser()) {
        return "";
    }
    try {
        return window.localStorage.getItem(cookieConsentStorageKey) ?? "";
    }
    catch {
        return "";
    }
}
function readServerCookieConsentSnapshot() {
    return "";
}
function subscribeToCookieConsentChanges(callback) {
    if (!isBrowser()) {
        return () => undefined;
    }
    window.addEventListener("storage", callback);
    window.addEventListener(cookieConsentUpdatedEvent, callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(cookieConsentUpdatedEvent, callback);
    };
}
function parseCookieConsent(consentSnapshot) {
    if (!consentSnapshot) {
        return null;
    }
    try {
        const parsedConsent = JSON.parse(consentSnapshot);
        if (!isCookieConsentValue(parsedConsent)) {
            return null;
        }
        return parsedConsent;
    }
    catch {
        return null;
    }
}
function openCookieSettings() {
    if (!isBrowser()) {
        return;
    }
    window.dispatchEvent(new Event(cookieSettingsOpenEvent));
}
function subscribeToCookieSettingsOpen(callback) {
    if (!isBrowser()) {
        return () => undefined;
    }
    window.addEventListener(cookieSettingsOpenEvent, callback);
    return () => window.removeEventListener(cookieSettingsOpenEvent, callback);
}
function isCookieConsentValue(value) {
    if (!isRecord(value)) {
        return false;
    }
    return (value.necessary === true &&
        typeof value.analytics === "boolean" &&
        typeof value.updatedAt === "string");
}
function isRecord(value) {
    return typeof value === "object" && value !== null;
}
function isBrowser() {
    return typeof window !== "undefined";
}
