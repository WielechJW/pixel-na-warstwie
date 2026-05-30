import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/features/blog/components/article-detail";
import { blogArticles, getArticleBySlug } from "@/features/blog/content";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Wpis nie znaleziony | Pixel na Warstwie",
    };
  }

  return {
    title: `${article.title} | Pixel na Warstwie`,
    description: article.description,
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <ArticleDetail article={article} />
    </main>
  );
}
