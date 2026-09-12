import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import { ArticleCard } from "@/features/blog/components/article-card";
import { getBlogArticles } from "@/features/blog/content";

export async function ArticleList() {
  const articles = await getBlogArticles();
  const [featuredArticle, ...otherArticles] = articles;

  return (
    <section className="px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 border-b border-ink/10 pb-10 sm:pb-14 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="section-label">Dziennik pracowni</p>
              <h1 className="page-title mt-5">
                Każdy wydruk.<br />Nowa lekcja.
              </h1>
            </div>
            <p className="max-w-sm text-base leading-7 text-muted lg:pb-2">
              Testy, odkrycia i drobne potknięcia. Zapisujemy to, czego uczymy
              się przy drukarce — żeby kolejna warstwa była lepsza.
            </p>
          </div>
        </Reveal>

        {featuredArticle ? (
          <>
            <Reveal className="mt-9 sm:mt-12">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="section-label">Najnowszy wpis</p>
                <span className="font-mono text-xs text-ink/40">01 / {String(articles.length).padStart(2, "0")}</span>
              </div>
              <ArticleCard article={featuredArticle} featured headingLevel="h2" />
            </Reveal>

            {otherArticles.length > 0 && (
              <div className="mt-14 sm:mt-20">
                <Reveal>
                  <div className="mb-7 flex items-end justify-between gap-4">
                    <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">Więcej z warsztatu</h2>
                    <span className="hidden text-xs text-muted sm:block">Wiedza rośnie warstwa po warstwie.</span>
                  </div>
                </Reveal>
                <div className={`grid gap-6 md:grid-cols-2 ${otherArticles.length > 2 ? "lg:grid-cols-3" : ""}`}>
                  {otherArticles.map((article, index) => (
                    <Reveal className="h-full" delay={(index % 3) * 90} key={article.slug}>
                      <ArticleCard article={article} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <Reveal className="mt-12">
            <div className="surface-card mx-auto max-w-2xl px-7 py-14 text-center sm:px-12">
              <Icon name="layers" className="mx-auto size-10 text-brand-dark" />
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight">Pierwsze notatki już się drukują.</h2>
              <p className="mt-4 leading-7 text-muted">Pracujemy nad nowymi wpisami. W międzyczasie poznaj naszą pracownię i to, co nas inspiruje.</p>
              <Link className="button-secondary mt-7" href="/#o-nas">Poznaj pracownię <Icon name="arrow-up-right" className="size-4" /></Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
