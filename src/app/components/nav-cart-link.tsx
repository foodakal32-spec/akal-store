"use client";

import SiteLink from "./site-link";
import { useCart } from "./cart-provider";
import { useT } from "./i18n";

/** Cart icon for the top navigation that navigates to the full cart page. */
export default function NavCartLink({ className = "" }: { className?: string }) {
  const { count, ready } = useCart();
  const t = useT();
  return (
    <SiteLink
      href="/panier"
      aria-label={`${t("Panier", "السلة")}${ready && count ? ` (${count})` : ""}`}
      className={`relative w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/15 transition-colors shrink-0 ${className}`}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {ready && count > 0 && (
        <span className="absolute -top-0.5 -end-0.5 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-[#C9A24A] text-[0.6875rem] font-bold leading-none text-[#0C0E0F] [font-family:Inter,_sans-serif]">{count}</span>
      )}
    </SiteLink>
  );
}
