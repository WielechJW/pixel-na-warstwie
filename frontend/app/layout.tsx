import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixel na warstwie | Strona w przebudowie",
  description:
    "Pixel na warstwie przygotowuje nową stronę. Wracamy wkrótce z odświeżonym miejscem dla kreatywnych projektów.",
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
