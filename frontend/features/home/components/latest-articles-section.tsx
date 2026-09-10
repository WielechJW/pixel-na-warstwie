import Link from "next/link";

import { formatArticleDate, getBlogArticles } from "@/features/blog/content";

export async function LatestArticlesSection() {
  const articles = await getBlogArticles();
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28" id="notatki">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="section-label">Ostatnie wpisy</p>
            <h2 className="section-title mt-4">
              Zamiast zdjęć produktów: notatki z nauki
            </h2>
          </div>
          <Link className="button-secondary w-fit" href="/blog">
            Wszystkie wpisy
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {latestArticles.map((article) => (
            <article
              className="flex h-full flex-col rounded-[2rem] border-2 border-ink/10 bg-white p-6 shadow-[5px_5px_0_#e4f5ef]"
              key={article.slug}
            >
              <p className="text-sm font-bold text-coral">
                {article.category} / {formatArticleDate(article.publishedAt)}
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold leading-tight">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className="mt-4 flex-1 leading-7 text-ink/68">
                {article.description}
              </p>
              <Link
                className="mt-7 font-bold text-brand-dark"
                href={`/blog/${article.slug}`}
              >
                Czytaj wpis
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
