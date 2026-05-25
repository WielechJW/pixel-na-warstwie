import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixel na Warstwie | Braterska pracownia druku 3D",
  description:
    "Pixel na Warstwie to druk 3D z pasji dwóch braci. Dekoracje, gadżety, praktyczne dodatki i projekty tworzone warstwa po warstwie.",
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
