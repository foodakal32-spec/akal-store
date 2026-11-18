import Link from "next/link";
import type { ComponentProps } from "react";

/** Internal paths use next/link (animated page transitions); external links stay plain anchors. */
export default function SiteLink({ href, children, ...props }: ComponentProps<"a"> & { href: string }) {
  if (typeof href === "string" && href.startsWith("/")) {
    return <Link href={href} {...(props as Omit<ComponentProps<typeof Link>, "href">)}>{children}</Link>;
  }
  return <a href={href} {...props}>{children}</a>;
}
