import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/features/blog/components/article-detail";
import {
  getArticleBySlug,
  getBlogArticleSlugs,
} from "@/features/blog/content";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogArticleSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Wpis nie znaleziony | Pixel na Warstwie",
    };
  }

  return {
    title: `${article.title} | Pixel na Warstwie`,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      locale: "pl_PL",
      title: article.title,
      description: article.description,
      url: `/blog/${article.slug}`,
      publishedTime: article.publishedAt,
      tags: [...article.tags],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <ArticleDetail article={article} />
    </main>
  );
}
