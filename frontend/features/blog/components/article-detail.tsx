import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { ArticleArtwork } from "@/features/blog/components/article-artwork";
import styles from "@/features/blog/components/article-artwork.module.css";
import { formatArticleDate, type BlogArticle } from "@/features/blog/content";

type ArticleDetailProps = {
  article: BlogArticle;
};

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article className="px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pb-28">
      <div className="section-shell">
        <Link className="text-link text-sm" href="/blog">
          <Icon name="arrow-left" className="size-4" /> Wszystkie wpisy
        </Link>

        <Reveal>
          <header className="mx-auto max-w-4xl pb-10 pt-10 sm:pb-14 sm:pt-14">
            <p className="section-label">{article.category}</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-ink sm:text-5xl lg:text-[4rem]">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              {article.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink/10 pt-6 text-xs text-muted sm:text-sm">
              <span className="font-semibold text-ink">{siteConfig.name}</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-ink/25" />
              <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
              <span className="inline-flex items-center gap-1.5"><Icon name="clock" className="size-4" /> {article.readingTime} czytania</span>
            </div>
          </header>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-ink/10 sm:rounded-3xl">
            <ArticleArtwork className="!aspect-[16/8] max-h-[420px] sm:!aspect-[16/6]" slug={article.slug} />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="border-b border-ink/10 pb-7 lg:border-0 lg:pb-0">
            <nav aria-label="Spis treści artykułu" className="lg:sticky lg:top-32">
              <p className="section-label">W tym wpisie</p>
              <ol className="mt-5">
                {article.sections.map((section, index) => (
                  <li key={`${section.heading}-${index}`}>
                    <a className={styles.tocLink} href={`#sekcja-${index + 1}`}>
                      <span aria-hidden="true" className="pt-0.5 font-mono text-[0.65rem] text-ink/30">{String(index + 1).padStart(2, "0")}</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
                {article.takeaways.length > 0 && (
                  <li><a className={styles.tocLink} href="#wnioski"><Icon name="check" className="mt-1 size-3.5 shrink-0 text-brand-dark" /> Co zabieramy z tego testu</a></li>
                )}
              </ol>
              {article.tags.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2 border-t border-ink/10 pt-6">
                  {article.tags.map((tag) => <span className="rounded-full border border-ink/10 px-3 py-1.5 text-[0.7rem] text-muted" key={tag}>{tag}</span>)}
                </div>
              )}
            </nav>
          </aside>

          <div className="max-w-[720px]">
            <div className="space-y-12">
              {article.sections.map((section, index) => (
                <section className="scroll-mt-28" id={`sekcja-${index + 1}`} key={`${section.heading}-${index}`}>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">{section.heading}</h2>
                  <div className="mt-5 space-y-5">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p className="text-base leading-8 text-ink/70 sm:text-lg sm:leading-9" key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {article.takeaways.length > 0 && (
              <section className="mt-12 scroll-mt-28 rounded-2xl border border-brand-dark/15 bg-mint/65 p-6 sm:p-9" id="wnioski">
                <span className="mb-5 inline-flex size-10 items-center justify-center rounded-full border border-brand-dark/15 bg-white/60"><Icon name="sparkles" className="size-5 text-brand-dark" /></span>
                <p className="section-label">Zapisane na później</p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.035em]">Co zabieramy z tego testu</h2>
                <ul className="mt-6 space-y-4">
                  {article.takeaways.map((takeaway, index) => (
                    <li className="flex gap-3 text-sm leading-7 text-ink/75 sm:text-base" key={index}>
                      <Icon name="check" className="mt-1.5 size-4 shrink-0 text-brand-dark" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-ink/10 pt-8 sm:flex-row sm:items-center">
              <div><p className="font-display text-xl font-semibold tracking-tight">Jeszcze jedna warstwa wiedzy?</p><p className="mt-2 text-sm text-muted">Kolejne obserwacje czekają w dzienniku.</p></div>
              <Link className="button-secondary shrink-0" href="/blog">Wróć do bloga <Icon name="arrow-up-right" className="size-4" /></Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
