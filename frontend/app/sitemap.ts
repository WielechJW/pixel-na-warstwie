import type { MetadataRoute } from "next";

export const revalidate = 60;

import { getAbsoluteSiteUrl } from "@/config/site-url";
import { getBlogArticles } from "@/features/blog/content";

const staticRoutes = [
  {
    changeFrequency: "weekly",
    path: "/",
    priority: 1,
  },
  {
    changeFrequency: "weekly",
    path: "/blog",
    priority: 0.9,
  },
  {
    changeFrequency: "yearly",
    path: "/kontakt",
    priority: 0.7,
  },
  {
    changeFrequency: "yearly",
    path: "/polityka-prywatnosci",
    priority: 0.4,
  },
  {
    changeFrequency: "yearly",
    path: "/cookies",
    priority: 0.4,
  },
  {
    changeFrequency: "yearly",
    path: "/zasady",
    priority: 0.4,
  },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getBlogArticles();

  return [
    ...staticRoutes.map((route) => ({
      changeFrequency: route.changeFrequency,
      lastModified: new Date(),
      priority: route.priority,
      url: getAbsoluteSiteUrl(route.path),
    })),
    ...articles.map((article) => ({
      changeFrequency: "monthly" as const,
      lastModified: article.publishedAt,
      priority: 0.8,
      url: getAbsoluteSiteUrl(`/blog/${article.slug}`),
    })),
  ];
}
