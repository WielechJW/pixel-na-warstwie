import Image from "next/image";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink/8 px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <Image
            alt=""
            className="h-11 w-11"
            height={300}
            src="/logo.png"
            width={300}
          />
          <p className="font-display font-bold">{siteConfig.name}</p>
        </div>
        <p className="text-sm text-ink/58">{siteConfig.tagline}</p>
      </div>
    </footer>
  );
}
