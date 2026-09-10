import type { Metadata } from "next";

import { ArticleList } from "@/features/blog/components/article-list";

export const metadata: Metadata = {
  title: "Blog | Pixel na Warstwie",
  description:
    "Notatki Pixel na Warstwie o nauce druku 3D, pierwszych testach, kalibracji, slicerze, filamentach i błędach początkujących.",
};

export default function BlogPage() {
  return (
    <main>
      <ArticleList />
    </main>
  );
}
