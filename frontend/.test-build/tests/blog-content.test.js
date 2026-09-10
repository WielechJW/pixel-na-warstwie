"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const content_1 = require("../features/blog/content");
const originalFetch = global.fetch;
const originalCmsUrl = process.env.CMS_URL;
(0, node_test_1.afterEach)(() => {
    global.fetch = originalFetch;
    if (originalCmsUrl === undefined)
        delete process.env.CMS_URL;
    else
        process.env.CMS_URL = originalCmsUrl;
});
function post(slug) {
    return { slug, title: "Test", description: "Opis", publishedAt: "2026-09-10",
        readingTime: "2 min", sections: [], takeaways: [] };
}
(0, node_test_1.test)("uses bundled articles only when CMS is not configured", async () => {
    delete process.env.CMS_URL;
    strict_1.default.equal(await (0, content_1.getBlogArticles)(), content_1.blogArticles);
});
(0, node_test_1.test)("loads all CMS pages and rejects invalid dates and unsafe slugs", async () => {
    process.env.CMS_URL = "http://cms.test";
    const pages = [];
    global.fetch = async (input) => {
        const url = new URL(String(input));
        strict_1.default.equal(url.searchParams.get("where[status][equals]"), "published");
        pages.push(url.searchParams.get("page"));
        return Response.json(pages.length === 1
            ? { docs: [post("first"), post("bad/slug"), { ...post("bad-date"), publishedAt: "oops" }], hasNextPage: true }
            : { docs: [post("second")], hasNextPage: false });
    };
    strict_1.default.deepEqual((await (0, content_1.getBlogArticles)()).map((article) => article.slug), ["first", "second"]);
    strict_1.default.deepEqual(pages, ["1", "2"]);
});
(0, node_test_1.test)("CMS outage fails revalidation instead of replacing live content", async () => {
    process.env.CMS_URL = "http://cms.test";
    global.fetch = async () => new Response(null, { status: 503 });
    await strict_1.default.rejects((0, content_1.getBlogArticles)(), /CMS-a/);
});
(0, node_test_1.test)("empty CMS stays empty", async () => {
    process.env.CMS_URL = "http://cms.test";
    global.fetch = async () => Response.json({ docs: [], hasNextPage: false });
    strict_1.default.deepEqual(await (0, content_1.getBlogArticles)(), []);
});
