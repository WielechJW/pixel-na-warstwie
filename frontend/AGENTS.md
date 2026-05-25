<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Pixel na Warstwie - Architektura Projektu

## Cel

Projekt jest stroną marki druku 3D, przygotowaną do rozwoju o blog oraz sklep
internetowy. Kod ma pozostać prosty do odczytania: routing i layouty należą do
`app/`, współdzielone elementy interfejsu do `components/`, a logika i widoki
konkretnych funkcji biznesowych do `features/`.

Jeżeli lokalna dokumentacja Next.js wskazana powyżej nie jest obecna w
zainstalowanej paczce, przed użyciem nowego API sprawdź oficjalną dokumentację
odpowiadającą zainstalowanej głównej wersji Next.js.

## Obecna Struktura

```text
app/
  layout.tsx                    # globalne HTML, metadane i style
  globals.css                   # tokeny kolorów i globalne klasy marki
  (marketing)/
    layout.tsx                  # wspólny shell strony publicznej
    page.tsx                    # kompozycja strony głównej pod adresem /
components/
  layout/
    site-header.tsx             # nawigacja publiczna
    site-footer.tsx             # stopka publiczna
config/
  site.ts                       # nazwa marki, tagline i nawigacja
features/
  home/
    content.ts                  # treści oraz lista realizacji strony głównej
    components/                 # samodzielne sekcje landing page
public/
  logo.png
  project/                      # zdjęcia rzeczywistych realizacji
```

## Docelowy Schemat Rozwoju

Nowe foldery dodawaj dopiero wtedy, gdy dana funkcja jest implementowana.
Poniższy układ określa miejsce dla planowanych funkcji:

```text
app/
  (marketing)/
    blog/
      page.tsx                  # lista artykułów
      [slug]/page.tsx           # artykuł i metadata SEO
  (shop)/
    sklep/
      page.tsx                  # katalog produktów
      [slug]/page.tsx           # karta produktu
    koszyk/page.tsx
    zamowienie/page.tsx
  api/                          # wyłącznie endpointy wymagane integracjami
components/
  layout/                       # nagłówki, stopki i shelle tras
  ui/                           # ogólne, małe prymitywy UI bez logiki domeny
features/
  blog/                         # komponenty, zapytania i modele bloga
  catalog/                      # produkty, filtry i prezentacja oferty
  cart/                         # stan oraz operacje koszyka
  checkout/                     # formularze i proces zamówienia
lib/
  cms/                          # integracja treści bloga, jeżeli powstanie
  commerce/                     # źródło produktów, płatności i zamówień
  validation/                   # schematy walidacji danych wejściowych
types/                          # typy współdzielone między funkcjami
```

## Granice Odpowiedzialności

- `app/` definiuje URL-e, layouty, metadata i składa widoki. Nie przechowuj w
  plikach tras rozbudowanych sekcji JSX ani tablic treści.
- `features/<feature>/` jest właścicielem komponentów, danych, typów i operacji
  właściwych dla jednej funkcji, np. strony głównej, bloga lub koszyka.
- `components/layout/` zawiera elementy wspólne dla wielu tras.
- `components/ui/` dodawaj dopiero dla elementów rzeczywiście ponownie
  używanych i pozbawionych wiedzy o marce, produkcie lub artykule.
- `config/site.ts` jest pojedynczym miejscem dla publicznych stałych marki i
  nawigacji. Docelowe dane kontaktowe również powinny trafić tutaj.
- `lib/` służy integracjom i kodowi technicznemu, a nie markupowi strony.

## Zasady Implementacji

- Stosuj Server Components domyślnie. `"use client"` dodawaj tylko w małym
  komponencie, który potrzebuje stanu, efektów lub obsługi interakcji klienta.
- Używaj importów absolutnych `@/` między modułami projektu.
- Komponenty nazywaj `PascalCase`, a ich pliki `kebab-case.tsx`.
- Zachowuj polskie znaki w treściach widocznych dla użytkownika.
- Obrazy wyświetlaj przez `next/image`, z opisowym `alt`, prawidłowym `sizes`
  i zoptymalizowanym plikiem źródłowym przed publikacją.
- Kolory i wspólne reguły wizualne rozszerzaj przez tokeny w `globals.css`;
  unikaj rozproszonych, niemających uzasadnienia wartości kolorów.
- Blog powinien otrzymać własny model treści i generowanie metadanych dla
  artykułów; nie mieszaj artykułów z danymi strony głównej.
- Sklep powinien oddzielać katalog, koszyk i zamówienie. Walidacja ceny,
  dostępności i danych zamówienia musi działać po stronie serwera.
- Sekretów, kluczy płatności i prywatnych danych nigdy nie umieszczaj w kodzie
  klienta ani w `NEXT_PUBLIC_*`.

## Weryfikacja Zmian

Po zmianach w interfejsie, routingu lub danych uruchom:

```bash
npm run lint
npm run build
```

Przed wdrożeniem sklepu należy dodatkowo dodać testy krytycznych ścieżek:
koszyk, kalkulację ceny, formularz zamówienia i integrację płatności.
