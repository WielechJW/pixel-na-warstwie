import Link from "next/link";

import { formatArticleDate, getBlogArticles } from "@/features/blog/content";

export async function ArticleList() {
  const articles = await getBlogArticles();

  return (
    <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-label">Blog</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-none text-ink sm:text-6xl">
            Notatki z nauki druku 3D
          </h1>
          <p className="mt-6 text-lg leading-8 text-ink/72">
            Zbieramy tu wpisy o testach, ustawieniach i doświadczeniach. Bez
            udawania katalogu produktów, za to z miejscem na błędy i wnioski.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <article
              className="rounded-[2rem] border-2 border-ink/10 bg-white p-7 shadow-[6px_6px_0_#e4f5ef]"
              key={article.slug}
            >
              <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-ink/58">
                <time dateTime={article.publishedAt}>
                  {formatArticleDate(article.publishedAt)}
                </time>
                <span>/</span>
                <span>{article.readingTime}</span>
              </div>
              <p className="mt-5 text-sm font-bold text-coral">
                {article.category}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="mt-4 leading-7 text-ink/68">
                {article.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span className="feature-chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                className="mt-7 inline-flex font-bold text-brand-dark"
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
