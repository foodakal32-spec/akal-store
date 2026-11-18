"use client";

import SiteLink from "./site-link";
import { useLang } from "./i18n";
import { policies } from "../policies";

/** Row of store-policy links shown at the bottom of the footer. */
export default function FooterLegalLinks() {
  const { lang } = useLang();
  return (
    <nav aria-label={lang === "ar" ? "سياسات المتجر" : "Politiques du magasin"} className="w-full flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
      {policies.map((p) => (
        <SiteLink
          key={p.slug}
          href={`/politiques/${p.slug}`}
          className="text-sm text-white/70 hover:text-white transition-colors [font-family:Inter,_'Inter_Placeholder',_sans-serif]"
        >
          {p[lang].title}
        </SiteLink>
      ))}
    </nav>
  );
}
