import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { ArticleArtwork } from "@/features/blog/components/article-artwork";
import styles from "@/features/blog/components/article-artwork.module.css";
import { formatArticleDate, type BlogArticle } from "@/features/blog/content";

type ArticleCardProps = {
  article: BlogArticle;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
};

export function ArticleCard({
  article,
  featured = false,
  headingLevel: Heading = "h3",
}: ArticleCardProps) {
  return (
    <article className="h-full min-w-0">
      <Link
        className={`${styles.card} ${featured ? styles.featured : ""}`}
        href={`/blog/${article.slug}`}
      >
        <ArticleArtwork slug={article.slug} />
        <div className={`flex flex-1 flex-col ${featured ? "p-7 sm:p-9 lg:p-11" : "p-6 sm:p-7"}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold tracking-wide text-brand-dark">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              <Icon name="clock" className="size-3.5" />
              {article.readingTime}
            </span>
          </div>
          <Heading
            className={`mt-4 font-display font-semibold tracking-[-0.035em] text-ink ${featured ? "text-3xl leading-[1.15] lg:text-[2.5rem]" : "text-[1.45rem] leading-[1.25]"}`}
          >
            {article.title}
          </Heading>
          <p className={`mt-4 flex-1 leading-7 text-muted ${featured ? "text-base" : "line-clamp-3 text-sm"}`}>
            {article.description}
          </p>
          <div className={`flex items-center justify-between gap-4 border-t border-ink/10 pt-5 ${featured ? "mt-8" : "mt-6"}`}>
            <time className="text-xs text-muted" dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt)}
            </time>
            <span className={styles.arrow}>
              <Icon name="arrow-up-right" className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
