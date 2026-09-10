# Publikacja Pixel na Warstwie

## Stan po przeglądzie 10.09.2026

Zmiany przygotowano na `dev`. Gałąź produkcyjna w tym repozytorium nazywa się
`main`, a push do niej automatycznie uruchamia wdrożenie frontendu. CMS nie jest
publikowany przez ten workflow. Nie wykonano merge, push ani wdrożenia na serwer.

Poprawiono:

- paczkę frontendu: zawiera teraz `public` i konfigurację Next.js; instalacja
  zależności na serwerze używa lockfile i odbywa się przed przeniesieniem starej
  wersji do kopii zapasowej; wdrożenia są kolejkowane;
- podatne zależności: Next.js 15.5.25 we frontendzie, Next.js 16.3.4 i Payload
  3.88.0 w CMS, Sharp 0.35.4 oraz pozostałe poprawki w lockfile;
- odświeżanie stron bloga i sitemap co 60 sekund również po buildzie bez CMS;
- pobieranie wszystkich stron wyników CMS, walidację dat i slugów, timeout;
- obsługę awarii CMS: ISR zachowuje wcześniejszą stronę zamiast zastępować
  opublikowane teksty lokalnymi wpisami; pierwsza wizyta bez dostępnej treści
  pokazuje komunikat błędu;
- układ kontaktu na małych ekranach, timeout wysyłki i anulowanie zbyt dużego body;
- canonical i Open Graph artykułów; informację o Resend w polityce prywatności;
- konfigurację Docker CMS, trwały katalog mediów i ograniczenie uploadu do obrazów;
- początkową migrację Postgres, testy dostępu do CMS i błędne porty testów E2E;
- CI: lint, testy, build, audyt i migracja na pustej bazie przed wdrożeniem.

## Wymagane ustawienia na serwerze

Weryfikacja lokalna po poprawkach:

- frontend: lint, 10 testów, build produkcyjny — OK; audyt 0 podatności;
- CMS: lint, TypeScript, build, 4 testy integracyjne i 4 E2E — OK;
- migracja na pustym PostgreSQL 14.24 — OK (CI używa PostgreSQL 16);
- przeglądarka: 7 stron przy szerokościach 320, 390, 768 i 1440 px — bez
  poziomego przewijania i błędów JavaScript; sprawdzono zgodę cookies, logo,
  404 i odpowiedzi walidacji formularza 400/413/422;
- osobno rozpakowano paczkę wdrożeniową, wykonano `npm ci --omit=dev` i
  uruchomiono ją produkcyjnie — blog i logo zwracają HTTP 200;
- testy wykonano w WSL/Linux na Node.js 24.14.1. Nie jest to test MyDevil/FreeBSD.
  CMS build kończy się ostrzeżeniem kompilatora, bez błędu i bez wskazanej treści.

1. Node.js 22.17+ (zalecana aktualna poprawka 22.x), npm i PostgreSQL.
   Frontend i CMS to dwa odrębne procesy. Ustaw HTTPS i reverse proxy dla obu.
2. Frontend: `SITE_URL=https://pixelnawarstwie.pl`, `CMS_URL` wskazujący działający
   CMS i konfiguracja poczty z [frontend/SMTP.md](frontend/SMTP.md).
   Alternatywnie można użyć `RESEND_API_KEY` i `CONTACT_FROM_EMAIL` z domeny
   zweryfikowanej w Resend. `CONTACT_TO_EMAIL` wybiera odbiorcę.
   Bez konfiguracji poczty formularz zwraca 503.
   Nie wpisuj sekretów do `NEXT_PUBLIC_*` ani do repozytorium.
3. CMS: `DATABASE_URL`, silny losowy `PAYLOAD_SECRET`,
   `PAYLOAD_PUBLIC_SERVER_URL` jako publiczny adres HTTPS panelu,
   `FRONTEND_URL=https://pixelnawarstwie.pl`, `MEDIA_DIR` jako bezwzględny,
   trwały katalog zapisywalny przez proces CMS.
4. Załóż pierwsze konto administratora przed publicznym udostępnieniem panelu.
5. Ustaw w GitHub Secrets: `SSH_HOST`, `SSH_USER`, `SSH_PORT`,
   `SSH_PRIVATE_KEY`, `DEPLOY_PATH` (bezwzględna ścieżka katalogu aplikacji).
   Konto SSH musi mieć dostęp do `node`, `npm` i `devil` w nieinteraktywnej sesji.
6. Proxy musi nadpisywać `X-Forwarded-For` prawdziwym IP klienta. Limit kontaktu
   jest w pamięci jednego procesu; przy wielu instancjach potrzebny jest wspólny
   limiter lub limit na reverse proxy. Ustaw też limit body i czas odczytu żądania.

Zmienne frontendu muszą być dostępne dla uruchomionego procesu. CI buduje
frontend bez połączenia z produkcyjnym CMS. Pierwsza zapisana wersja zawiera
lokalne teksty; po uruchomieniu z `CMS_URL` ruch wyzwala odświeżenie po 60 s.
Przed otwarciem strony dla odwiedzających sprawdź stronę główną, blog i sitemap
po odświeżeniu. Jeśli pierwsza wersja ma od razu zawierać właściwe treści,
zbuduj frontend z dostępnym `CMS_URL`.

## Pierwsze uruchomienie CMS

W katalogu `cms`, po ustawieniu zmiennych:

```sh
npm ci
NODE_ENV=production npm run payload -- migrate
npm run build
npm start
```

Migracja `20260910_131225_initial` jest przeznaczona do pustej bazy. Nie uruchamiaj
jej bezpośrednio na istniejącej bazie tworzonej przez dev `push`: najpierw backup
i uzgodnienie istniejącego schematu/historii migracji. Migracja tworzy schemat,
nie przenosi artykułów, kont ani uploadów. Dane przenosi się osobno, np. przez
backup/restore Postgres i kopię katalogu mediów.

W Dockerze zamontuj trwały wolumen pod `/app/media` i przekaż zmienne w runtime.
Migracje wykonaj osobnym krokiem z katalogu źródłowego przed uruchomieniem obrazu.
Zwykły build Next.js nie wykonuje migracji. Dockerfile nie został uruchomiony
w tym przeglądzie, ponieważ Docker Engine był niedostępny.

## Aktualizacja i przywrócenie frontendu

Workflow najpierw uruchamia kontrole obu aplikacji, potem pakuje frontend.
Na serwerze przygotowuje `.deploy-stage.*` i instaluje zależności dla platformy
serwera. Dopiero po powodzeniu przenosi starą aplikację do `.deploy-backup.*`,
aktywuje nową i wywołuje `devil www restart pixelnawarstwie.pl`.
Pliki środowiska i konfiguracja startowa hostingu pozostają w katalogu aplikacji.

To wdrożenie w miejscu: podczas podmiany możliwa jest krótka przerwa. Nie ma
automatycznego rollbacku ani kontroli HTTP po restarcie. W razie problemu
przywróć zawartość wskazanego w logu `.deploy-backup.*` i zrestartuj aplikację.
Kopie zajmują miejsce — usuń stare dopiero po potwierdzeniu poprawnej publikacji.

## Pozostałe ograniczenia

- Nie zweryfikowano konfiguracji MyDevil, DNS, HTTPS, sekretów, startu procesu
  ani dostarczenia prawdziwego e-maila; wymagają dostępu do środowiska docelowego.
- CMS nie ma adaptera pocztowego: reset hasła nie wysyła e-maili. Skonfiguruj
  adapter przed poleganiem na odzyskiwaniu dostępu przez pocztę.
- Audyt CMS nadal zgłasza 6 umiarkowanych pozycji: łańcuch narzędzi migracyjnych
  Drizzle/esbuild i Payload account-unlock. Endpoint `users` unlock wyłączono
  przez access control; blokady kont wygasają zgodnie z konfiguracją auth.
  Nie uruchamiaj serwera deweloperskiego esbuild publicznie. Aktualizuj zależności
  po wydaniu poprawek upstream; nie wymuszono niezgodnych wersji Drizzle.
- Analityka GA/GTM nie jest wdrożona; istnieje tylko mechanizm zgody.
- Pole `heroImage` jest w CMS, lecz aktualny widok artykułów nie renderuje zdjęć.
  Publikacja bloga tekstowego działa; zdjęcia artykułów wymagają dalszej integracji.

Podstawy konfiguracji: [Next.js caching](https://nextjs.org/docs/15/app/guides/caching),
[Payload migrations](https://payloadcms.com/docs/database/migrations),
[Next.js output](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/output).
