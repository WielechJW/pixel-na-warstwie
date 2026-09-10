export type CookieConsentValue = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

const cookieConsentStorageKey = "pixel-na-warstwie-cookie-consent-v1";
const cookieConsentUpdatedEvent = "pixel-cookie-consent-updated";
const cookieSettingsOpenEvent = "pixel-open-cookie-settings";

export function saveCookieConsent(analytics: boolean) {
  const consent: CookieConsentValue = {
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };

  if (!isBrowser()) {
    return consent;
  }

  try {
    window.localStorage.setItem(cookieConsentStorageKey, JSON.stringify(consent));
  } catch {
    console.warn("Cookie consent could not be saved in localStorage.");
  }

  window.dispatchEvent(
    new CustomEvent(cookieConsentUpdatedEvent, {
      detail: consent,
    }),
  );

  return consent;
}

export function readCookieConsent() {
  return parseCookieConsent(readCookieConsentSnapshot());
}

export function hasAnalyticsConsent() {
  return readCookieConsent()?.analytics === true;
}

export function readCookieConsentSnapshot() {
  if (!isBrowser()) {
    return "";
  }

  try {
    return window.localStorage.getItem(cookieConsentStorageKey) ?? "";
  } catch {
    return "";
  }
}

export function readServerCookieConsentSnapshot() {
  return "";
}

export function subscribeToCookieConsentChanges(callback: () => void) {
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

export function parseCookieConsent(consentSnapshot: string) {
  if (!consentSnapshot) {
    return null;
  }

  try {
    const parsedConsent: unknown = JSON.parse(consentSnapshot);

    if (!isCookieConsentValue(parsedConsent)) {
      return null;
    }

    return parsedConsent;
  } catch {
    return null;
  }
}

export function openCookieSettings() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(cookieSettingsOpenEvent));
}

export function subscribeToCookieSettingsOpen(callback: () => void) {
  if (!isBrowser()) {
    return () => undefined;
  }

  window.addEventListener(cookieSettingsOpenEvent, callback);

  return () => window.removeEventListener(cookieSettingsOpenEvent, callback);
}

function isCookieConsentValue(value: unknown): value is CookieConsentValue {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.necessary === true &&
    typeof value.analytics === "boolean" &&
    typeof value.updatedAt === "string"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isBrowser() {
  return typeof window !== "undefined";
}
