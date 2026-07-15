# Pixel na Warstwie CMS

Payload CMS for blog content, media, categories, and tags.

## Local Development

Start the local database from the repository root:

```bash
docker compose up -d postgres
```

Then start the CMS:

```bash
cd cms
npm run dev
```

Open:

- CMS landing page: http://localhost:3001
- Admin panel: http://localhost:3001/admin
- Posts API: http://localhost:3001/api/posts?depth=2&limit=10

The first visit to `/admin` lets you create the first administrator account.

## Environment

Copy `.env.example` to `.env` if the local env file is missing.

```env
DATABASE_URL=postgres://payload:payload@127.0.0.1:5432/pixel_payload
PAYLOAD_SECRET=change-this-secret
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

For production, use a long random `PAYLOAD_SECRET`, a production Postgres
database, HTTPS URLs, and persistent storage for uploaded media.
