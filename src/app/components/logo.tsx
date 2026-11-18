import SiteLink from "./site-link";
import type { ReactNode } from "react";

export type LogoData = {
  href: string;
  icon: ReactNode;
};

/** A logo. */
export default function Logo({ d, cids }: { d: LogoData; cids: string[] }) {
  return (
    <SiteLink
      data-cid={cids?.[0]}
      className="hidden max-lg:w-10 max-lg:h-10 max-lg:flex max-lg:relative max-lg:rounded-full max-lg:justify-center max-lg:items-center max-lg:shrink-0 max-lg:text-white max-lg:bg-white/10 hover:max-lg:bg-white/20 max-lg:transition-colors max-lg:cursor-pointer"
      href={d.href}
      target="_blank"
    >
      <span className="w-5 h-5 flex items-center justify-center text-white">
        {d.icon}
      </span>
    </SiteLink>
  );
}
