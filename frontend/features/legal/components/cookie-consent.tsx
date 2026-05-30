"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const consentStorageKey = "pixel-na-warstwie-cookie-consent-v1";
const openSettingsEvent = "pixel-open-cookie-settings";

type CookieConsentValue = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

function saveConsent(analytics: boolean) {
  const consent: CookieConsentValue = {
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(consentStorageKey, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent("pixel-cookie-consent-updated", {
      detail: consent,
    }),
  );
}

function readConsentSnapshot() {
  return window.localStorage.getItem(consentStorageKey) ?? "";
}

function readServerConsentSnapshot() {
  return "";
}

function subscribeToConsentChanges(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("pixel-cookie-consent-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("pixel-cookie-consent-updated", callback);
  };
}

function parseConsent(consentSnapshot: string) {
  if (!consentSnapshot) {
    return null;
  }

  try {
    return JSON.parse(consentSnapshot) as CookieConsentValue;
  } catch {
    return null;
  }
}

export function CookieSettingsButton() {
  return (
    <button
      className="nav-link font-bold"
      onClick={() => window.dispatchEvent(new Event(openSettingsEvent))}
      type="button"
    >
      Ustawienia cookies
    </button>
  );
}

export function CookieConsent() {
  const consentSnapshot = useSyncExternalStore(
    subscribeToConsentChanges,
    readConsentSnapshot,
    readServerConsentSnapshot,
  );
  const savedConsent = parseConsent(consentSnapshot);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [analyticsDraft, setAnalyticsDraft] = useState<boolean | null>(null);
  const analyticsAccepted = analyticsDraft ?? savedConsent?.analytics ?? false;
  const isVisible = isSettingsOpen || !savedConsent;

  useEffect(() => {
    const openSettings = () => setIsSettingsOpen(true);
    window.addEventListener(openSettingsEvent, openSettings);

    return () => window.removeEventListener(openSettingsEvent, openSettings);
  }, []);

  const chooseConsent = (analytics: boolean) => {
    saveConsent(analytics);
    setAnalyticsDraft(null);
    setIsSettingsOpen(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6">
      <section className="mx-auto max-w-5xl rounded-[2rem] border-2 border-ink bg-white p-5 shadow-[6px_6px_0_var(--ink)] sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-label">Cookies</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink">
              Ustawienia prywatności
            </h2>
            <p className="mt-3 leading-7 text-ink/70">
              Strona używa elementów niezbędnych do działania. Analityka Google
              i tagi GTM będą uruchamiane dopiero po Twojej zgodzie.
            </p>
            <label className="mt-4 flex items-start gap-3 rounded-2xl border-2 border-ink/10 bg-mint p-4">
              <input
                checked={analyticsAccepted}
                className="mt-1 h-5 w-5 accent-[#207f82]"
                onChange={(event) =>
                  setAnalyticsDraft(event.currentTarget.checked)
                }
                type="checkbox"
              />
              <span>
                <span className="block font-bold text-ink">
                  Analityka i rozwój strony
                </span>
                <span className="mt-1 block text-sm leading-6 text-ink/65">
                  Pomaga sprawdzać, które wpisy są czytane i jak ulepszać bloga.
                </span>
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              className="button-primary"
              onClick={() => chooseConsent(true)}
              type="button"
            >
              Akceptuję analitykę
            </button>
            <button
              className="button-secondary"
              onClick={() => chooseConsent(analyticsAccepted)}
              type="button"
            >
              Zapisz wybór
            </button>
            <button
              className="font-bold text-ink/62"
              onClick={() => chooseConsent(false)}
              type="button"
            >
              Tylko niezbędne
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
