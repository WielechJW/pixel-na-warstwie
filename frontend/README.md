# Pixel na Warstwie

Strona i blog o nauce druku 3D. Projekt nie jest obecnie nastawiony na
sprzedaż ani przyjmowanie zleceń, tylko na opisywanie doświadczeń, testów,
błędów i wniosków z domowego warsztatu.

## Start

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

Główna strona jest w `app/(marketing)/page.tsx`, a wpisy blogowe mają dane w
`features/blog/content.ts`.

## Do zrobienia następnego dnia

- Uporządkować kontakt:
  obecny formularz w `features/legal/components/contact-page.tsx` działa przez
  `mailto:`, więc jest tylko tymczasowym rozwiązaniem. Docelowo zdecydować, czy
  zostaje prosty link mailowy, czy powstaje prawdziwy formularz z obsługą po
  stronie serwera.
- Przygotować zgody pod Google Analytics i Google Tag Manager:
  przed wklejeniem tagów wyciągnąć logikę zgody z
  `features/legal/components/cookie-consent.tsx` do osobnego modułu, żeby GA/GTM
  mogły bezpiecznie sprawdzać zgodę przed uruchomieniem.
- Usunąć duplikację danych prawnych:
  właściciel i e-mail są teraz w `config/site.ts` oraz `features/legal/content.ts`.
  Zostawić jedno źródło prawdy, najlepiej `siteConfig`, i używać go w treściach
  prawnych.
- Dopiero po powyższym podpiąć Google Search Console, GA i GTM. Analityka oraz
  tagi marketingowe muszą startować dopiero po zgodzie użytkownika.

## Przydatne komendy

```bash
npm run lint
npm run build
```
