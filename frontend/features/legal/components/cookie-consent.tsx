"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Icon } from "@/components/ui/icon";
import {
  openCookieSettings,
  parseCookieConsent,
  readCookieConsentSnapshot,
  readServerCookieConsentSnapshot,
  saveCookieConsent,
  subscribeToCookieConsentChanges,
  subscribeToCookieSettingsOpen,
} from "@/features/legal/cookie-consent";

export function CookieSettingsButton() {
  return (
    <button
      className="nav-link text-left"
      onClick={openCookieSettings}
      type="button"
    >
      Ustawienia cookies
    </button>
  );
}

export function CookieConsent() {
  const consentSnapshot = useSyncExternalStore(
    subscribeToCookieConsentChanges,
    readCookieConsentSnapshot,
    readServerCookieConsentSnapshot,
  );
  const savedConsent = parseCookieConsent(consentSnapshot);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [analyticsDraft, setAnalyticsDraft] = useState<boolean | null>(null);
  const analyticsAccepted = analyticsDraft ?? savedConsent?.analytics ?? false;
  const isVisible = isSettingsOpen || !savedConsent;

  useEffect(() => {
    return subscribeToCookieSettingsOpen(() => {
      setAnalyticsDraft(null);
      setIsSettingsOpen(true);
    });
  }, []);

  const chooseConsent = (analytics: boolean) => {
    saveCookieConsent(analytics);
    setAnalyticsDraft(null);
    setIsSettingsOpen(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-6 sm:pb-6">
      <section
        aria-labelledby="cookie-consent-title"
        className="pointer-events-auto max-h-[calc(100dvh-2rem)] max-w-lg overflow-y-auto rounded-3xl border border-ink/12 bg-white p-5 shadow-[0_12px_70px_-20px] shadow-ink/20 sm:p-6"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-brand-dark">
              <Icon name="sliders" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-dark">
                Po Twojej stronie
              </p>
              <h2
                id="cookie-consent-title"
                className="mt-0.5 font-display text-xl font-semibold tracking-tight text-ink"
              >
                Twoja prywatność
              </h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-ink/60">
            Strona używa elementów niezbędnych do działania. Analityka Google
            i tagi GTM będą uruchamiane dopiero po Twojej zgodzie.{" "}
            <Link
              className="font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:text-brand-dark"
              href="/cookies"
            >
              Więcej o cookies
            </Link>
          </p>
          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-ink/8 bg-cream/60 p-3.5">
            <input
              checked={analyticsAccepted}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-brand-dark"
              onChange={(event) =>
                setAnalyticsDraft(event.currentTarget.checked)
              }
              type="checkbox"
            />
            <span>
              <span className="block text-sm font-semibold text-ink">
                Analityka i rozwój strony
              </span>
              <span className="mt-1 block text-xs leading-5 text-ink/55">
                Pomaga sprawdzać, które wpisy są czytane i jak ulepszać bloga.
              </span>
            </span>
          </label>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
          <button
            className="button-primary px-3! text-xs!"
            onClick={() => chooseConsent(true)}
            type="button"
          >
            Akceptuję analitykę
          </button>
          <button
            className="button-secondary px-3! text-xs!"
            onClick={() => chooseConsent(false)}
            type="button"
          >
            Tylko niezbędne
          </button>
          <button
            className="rounded-xl px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-mint hover:text-brand-dark min-[380px]:col-span-2"
            onClick={() => chooseConsent(analyticsAccepted)}
            type="button"
          >
            Zapisz mój wybór
          </button>
        </div>
      </section>
    </div>
  );
}
