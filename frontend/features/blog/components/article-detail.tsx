import Link from "next/link";

import type { BlogArticle } from "@/features/blog/content";
import { formatArticleDate } from "@/features/blog/content";

type ArticleDetailProps = {
  article: BlogArticle;
};

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <Link className="font-bold text-brand-dark" href="/blog">
          Wróć do bloga
        </Link>
        <p className="section-label mt-10">{article.category}</p>
        <h1 className="mt-4 font-display text-5xl font-bold leading-none text-ink sm:text-6xl">
          {article.title}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-bold text-ink/58">
          <time dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt)}
          </time>
          <span>/</span>
          <span>{article.readingTime}</span>
        </div>
        <p className="mt-8 text-xl leading-9 text-ink/72">
          {article.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span className="feature-chip" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-14 space-y-12">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-3xl font-bold">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-5">
                {section.paragraphs.map((paragraph) => (
                  <p className="text-lg leading-8 text-ink/76" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-14 rounded-[2rem] border-2 border-ink bg-mint p-7">
          <h2 className="font-display text-2xl font-bold">Wnioski</h2>
          <ul className="mt-5 space-y-3">
            {article.takeaways.map((takeaway) => (
              <li className="flex gap-3 leading-7 text-ink/76" key={takeaway}>
                <span className="font-bold text-coral">+</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
