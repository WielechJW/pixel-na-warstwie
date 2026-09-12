import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { ArticleCard } from "@/features/blog/components/article-card";
import { getBlogArticles } from "@/features/blog/content";

export async function LatestArticlesSection() {
  const articles = await getBlogArticles();
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-12 lg:py-28" id="notatki">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="section-label">Dziennik pracowni</p>
              <h2 className="section-title mt-4">Świeżo z warsztatu.</h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-muted">
                Trochę teorii, dużo praktyki. I wnioski, którymi warto się podzielić.
              </p>
            </div>
            <Link className="text-link mb-1 w-fit shrink-0" href="/blog">
              Wszystkie wpisy <Icon name="arrow-up-right" className="size-4" />
            </Link>
          </div>
        </Reveal>

        {latestArticles.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article, index) => (
              <Reveal className="h-full" delay={index * 100} key={article.slug}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-10">
            <div className="surface-card flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:p-10">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-mint"><Icon name="layers" className="size-6 text-brand-dark" /></span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">Dobre rzeczy potrzebują kilku warstw.</h3>
                <p className="mt-2 leading-7 text-muted">Nowe notatki są w przygotowaniu. Zajrzyj do nas ponownie.</p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
