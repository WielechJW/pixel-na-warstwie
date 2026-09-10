# Pixel na Warstwie

Strona i blog o nauce druku 3D. Projekt nie jest obecnie nastawiony na
sprzedaż ani przyjmowanie zleceń, tylko na opisywanie doświadczeń, testów,
błędów i wniosków z domowego warsztatu.

## Start

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

Główna strona jest w `app/(marketing)/page.tsx`. Blog może czytać dane z
Payload CMS, jeżeli ustawisz:

```env
CMS_URL=http://localhost:3001
```

Bez `CMS_URL` frontend używa lokalnych wpisów z `features/blog/content.ts`.

## Konfiguracja przed publikacją

- Skonfigurować wysyłkę formularza kontaktowego na produkcji:
  formularz wysyła dane do `app/api/contact/route.ts`. Lokalnie bez konfiguracji
  mail providerów wiadomość jest przyjmowana i wypisywana w terminalu dev
  servera. Do prawdziwej wysyłki ustaw po stronie serwera `RESEND_API_KEY`,
  `CONTACT_FROM_EMAIL` oraz opcjonalnie `CONTACT_TO_EMAIL`.
- Podpiąć Google Analytics i Google Tag Manager:
  logika zgody jest w `features/legal/cookie-consent.ts`. Komponenty tagów
  powinny sprawdzać zgodę przez `hasAnalyticsConsent()` i reagować na zmiany
  przez `subscribeToCookieConsentChanges()` przed uruchomieniem skryptów.
- Dopiero po powyższym podpiąć Google Search Console, GA i GTM. Analityka oraz
  tagi marketingowe muszą startować dopiero po zgodzie użytkownika.

## Przydatne komendy

```bash
npm run lint
npm test
npm run build
```

Przykładowe zmienne są w `.env.example`. Wdrożenie wymaga Node.js 22 lub
nowszego i procesu Next.js — formularz kontaktowy nie działa jako statyczny HTML.
Szczegóły wdrożenia i ograniczenia: [../DEPLOYMENT.md](../DEPLOYMENT.md).
