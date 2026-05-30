export const siteConfig = {
  name: "Pixel na Warstwie",
  shortDescription: "Blog o druku 3D",
  tagline: "Uczymy się druku 3D i zapisujemy każdą warstwę doświadczeń.",
  owner: "Jakub Wielechowski",
  contactEmail: "pixelnawarstwie@gmail.com",
  navigation: [
    { label: "O nas", href: "/#o-nas" },
    { label: "Tematy", href: "/#tematy" },
    { label: "Jak się uczymy", href: "/#jak-sie-uczymy" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  legalLinks: [
    { label: "Kontakt", href: "/kontakt" },
    { label: "Prywatność", href: "/polityka-prywatnosci" },
    { label: "Cookies", href: "/cookies" },
    { label: "Zasady", href: "/zasady" },
  ],
} as const;
