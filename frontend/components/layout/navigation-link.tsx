"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavigationLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function NavigationLink({ href, ...props }: NavigationLinkProps) {
  const pathname = usePathname();
  const current = pathname === href
    ? "page"
    : !href.includes("#") && pathname.startsWith(`${href}/`)
      ? "location"
      : undefined;

  return <Link aria-current={current} href={href} {...props} />;
}
