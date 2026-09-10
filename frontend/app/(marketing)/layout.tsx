import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CookieConsent } from "@/features/legal/components/cookie-consent";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SiteHeader />
      {children}
      <SiteFooter />
      <CookieConsent />
    </div>
  );
}
export const revalidate = 60;
