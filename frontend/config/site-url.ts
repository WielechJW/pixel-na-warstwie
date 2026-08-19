import { siteConfig } from "@/config/site";

export function getSiteUrl() {
  const configuredUrl =
    process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
  const urlWithProtocol = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;

  return urlWithProtocol.endsWith("/")
    ? urlWithProtocol.slice(0, -1)
    : urlWithProtocol;
}

export function getAbsoluteSiteUrl(path: string) {
  return new URL(path, `${getSiteUrl()}/`).toString();
}
