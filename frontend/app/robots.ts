import type { MetadataRoute } from "next";

import { getAbsoluteSiteUrl, getSiteUrl } from "@/config/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    host: getSiteUrl(),
    rules: {
      allow: "/",
      disallow: ["/api/"],
      userAgent: "*",
    },
    sitemap: getAbsoluteSiteUrl("/sitemap.xml"),
  };
}
