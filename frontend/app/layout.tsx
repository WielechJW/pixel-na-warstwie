import type { Metadata } from "next";
import localFont from "next/font/local";
import { getSiteUrl } from "@/config/site-url";
import "./globals.css";

const manrope = localFont({
  src: "../public/fonts/manrope-variable.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

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
    <html className={manrope.variable} lang="pl">
      <body>{children}</body>
    </html>
  );
}
