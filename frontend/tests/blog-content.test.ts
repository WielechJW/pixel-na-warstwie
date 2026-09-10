import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { blogArticles, getBlogArticles } from "../features/blog/content";

const originalFetch = global.fetch;
const originalCmsUrl = process.env.CMS_URL;
afterEach(() => {
  global.fetch = originalFetch;
  if (originalCmsUrl === undefined) delete process.env.CMS_URL;
  else process.env.CMS_URL = originalCmsUrl;
});

function post(slug: string) {
  return { slug, title: "Test", description: "Opis", publishedAt: "2026-09-10",
    readingTime: "2 min", sections: [], takeaways: [] };
}

test("uses bundled articles only when CMS is not configured", async () => {
  delete process.env.CMS_URL;
  assert.equal(await getBlogArticles(), blogArticles);
});

test("loads all CMS pages and rejects invalid dates and unsafe slugs", async () => {
  process.env.CMS_URL = "http://cms.test";
  const pages: string[] = [];
  global.fetch = async (input) => {
    const url = new URL(String(input));
    assert.equal(url.searchParams.get("where[status][equals]"), "published");
    pages.push(url.searchParams.get("page")!);
    return Response.json(pages.length === 1
      ? { docs: [post("first"), post("bad/slug"), { ...post("bad-date"), publishedAt: "oops" }], hasNextPage: true }
      : { docs: [post("second")], hasNextPage: false });
  };
  assert.deepEqual((await getBlogArticles()).map((article) => article.slug), ["first", "second"]);
  assert.deepEqual(pages, ["1", "2"]);
});

test("CMS outage fails revalidation instead of replacing live content", async () => {
  process.env.CMS_URL = "http://cms.test";
  global.fetch = async () => new Response(null, { status: 503 });
  await assert.rejects(getBlogArticles(), /CMS-a/);
});

test("empty CMS stays empty", async () => {
  process.env.CMS_URL = "http://cms.test";
  global.fetch = async () => Response.json({ docs: [], hasNextPage: false });
  assert.deepEqual(await getBlogArticles(), []);
});
