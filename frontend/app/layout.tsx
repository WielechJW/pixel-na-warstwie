import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixel na warstwie",
  description: "A clean Next.js starter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
