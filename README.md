# Pixel na Warstwie

Strona i CMS dla bloga o nauce druku 3D.

## Struktura

```text
frontend/          Publiczna strona Next.js
cms/               Payload CMS dla bloga, mediów, kategorii i tagów
docker-compose.yml Lokalny Postgres dla CMS-a
```

## Lokalny Start

Uruchom bazę:

```bash
docker compose up -d postgres
```

Uruchom CMS:

```bash
cd cms
npm ci
cp .env.example .env
npm run dev
```

CMS działa pod:

- http://localhost:3001
- http://localhost:3001/admin

Uruchom frontend:

```bash
cd frontend
npm ci
npm run dev
```

Frontend działa pod http://localhost:3000.

Żeby frontend czytał wpisy z CMS-a, ustaw w `frontend/.env.local`:

```env
CMS_URL=http://localhost:3001
```

Jeżeli `CMS_URL` nie jest ustawione, frontend używa lokalnych wpisów z
`frontend/features/blog/content.ts`. Gdy skonfigurowany CMS jest niedostępny,
odświeżanie zgłasza błąd i zachowuje ostatnią poprawnie wygenerowaną stronę.

Instrukcja produkcyjna i wynik przeglądu: [DEPLOYMENT.md](DEPLOYMENT.md).
