import type { Metadata } from "next";
import { getSiteUrl } from "@/config/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Pixel na Warstwie | Blog o nauce druku 3D",
  description:
    "Pixel na Warstwie to dziennik dwóch braci, którzy uczą się druku 3D, opisują testy, błędy, ustawienia i doświadczenia z warsztatu.",
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
