import SiteLink from "./site-link";
import type { ReactNode } from "react";

export type Logo2Data = {
  href: string;
  icon: ReactNode;
};

/** A logo. */
export default function Logo2({ d, cids }: { d: Logo2Data; cids: string[] }) {
  return (
    <SiteLink
      data-cid={cids?.[0]}
      className="w-10 h-10 flex relative rounded-full justify-center items-center shrink-0 text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer max-lg:hidden"
      data-component="link"
      href={d.href}
      target="_blank"
    >
      <span className="w-5 h-5 flex items-center justify-center text-white">
        {d.icon}
      </span>
    </SiteLink>
  );
}
