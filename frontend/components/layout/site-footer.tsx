import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { CookieSettingsButton } from "@/features/legal/components/cookie-consent";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink/8 px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-6 text-center lg:grid-cols-[1fr_auto] lg:text-left">
        <div>
          <div className="flex items-center justify-center gap-3 lg:justify-start">
            <Image
              alt=""
              className="h-11 w-11"
              height={300}
              src="/logo.png"
              width={300}
            />
            <div>
              <p className="font-display font-bold">{siteConfig.name}</p>
              <p className="text-sm text-ink/58">{siteConfig.tagline}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink/58">
            {siteConfig.owner} / {siteConfig.contactEmail}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-bold text-ink/62 lg:justify-end">
          {siteConfig.legalLinks.map((item) => (
            <Link className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}
