"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SiteLink from "./site-link";
import { useLang, useT } from "./i18n";
import { productDetails } from "../product-data";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

// Edge-refraction maps for the liquid glass (red = horizontal shift, green = vertical shift).
const MAP_H =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#008080'/><stop offset='.1' stop-color='#808080'/><stop offset='.9' stop-color='#808080'/><stop offset='1' stop-color='#ff8080'/></linearGradient></defs><rect width='100' height='100' fill='url(#g)'/></svg>",
  );
const MAP_V =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#800080'/><stop offset='.2' stop-color='#808080'/><stop offset='.8' stop-color='#808080'/><stop offset='1' stop-color='#80ff80'/></linearGradient></defs><rect width='100' height='100' fill='url(#g)'/></svg>",
  );

/** Round search button for the top navigation; opens a Spotlight-style liquid-glass product search. */
export default function SearchButton({ className = "" }: { className?: string }) {
  const t = useT();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [closing, setClosing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const query = q.trim().toLowerCase();
  // Results only appear once the user types: match the first letters of a product name (any word).
  const results = useMemo(() => {
    if (!query) return [];
    const starts = (v?: string) => !!v && v.toLowerCase().split(/[\s\-'’]+/).some((w) => w.startsWith(query));
    return productDetails.filter((p) => starts(p.name) || starts(p.nameAr) || starts(p.ar?.name));
  }, [query]);

  // Play the exit animation first, then unmount.
  function close() {
    if (closing) return;
    setClosing(true);
    timer.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setQ("");
    }, 300);
  }
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("Rechercher", "بحث")}
        className={`relative w-10 h-10 flex items-center justify-center rounded-full text-[#2B2B2B] hover:bg-black/5 transition-colors shrink-0 cursor-pointer ${className}`}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
      {open &&
        createPortal(
          <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            className={`search-pop ${closing ? "is-closing" : ""} fixed inset-0 z-[100] flex flex-col items-center px-5 pt-[calc(env(safe-area-inset-top)+5.75rem)]`}
            role="dialog"
            aria-modal="true"
            aria-label={t("Rechercher", "بحث")}
          >
            <svg aria-hidden="true" width="0" height="0" className="absolute pointer-events-none">
              <filter id="akal-search-liquid" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
                <feImage href={MAP_V} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="mv" />
                <feDisplacementMap in="SourceGraphic" in2="mv" scale="34" xChannelSelector="R" yChannelSelector="G" result="dv" />
                <feImage href={MAP_H} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="mh" />
                <feDisplacementMap in="dv" in2="mh" scale="34" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </svg>
            <div className="search-pop__scrim absolute inset-0" onClick={close} />

            <div className="lg-glass relative z-10 w-full max-w-[34rem] h-16 rounded-full flex items-center gap-3 px-6">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-white/80">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("Rechercher un produit", "ابحث عن منتج")}
                className={`flex-1 min-w-0 h-full bg-transparent text-lg text-white placeholder:text-white/55 outline-none ${font}`}
              />
              <button type="button" onClick={close} aria-label={t("Fermer", "إغلاق")} className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full text-white/80 hover:bg-white/15 cursor-pointer">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            {query && (
            <div className="lg-glass relative z-10 mt-4 w-full max-w-[34rem] max-h-[calc(100dvh-14rem)] rounded-[2rem] overflow-hidden">
              <ul className="relative max-h-[inherit] overflow-y-auto p-3 flex flex-col">
                {results.length === 0 && <li className={`py-10 text-center text-white/70 ${font}`}>{t("Aucun produit trouvé", "لا توجد منتجات مطابقة")}</li>}
                {results.map((p) => (
                  <li key={p.slug}>
                    <SiteLink href={`/produits/${p.slug}`} onClick={close} className="flex items-center gap-4 rounded-2xl p-2.5 hover:bg-white/15 active:bg-white/20 transition-colors">
                      {p.images[0] && <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover bg-white/20" />}
                      <span className={`flex flex-col text-white ${font}`}>
                        <span className="text-base font-semibold">{t(p.name, p.nameAr ?? p.name)}</span>
                        <span className="text-sm text-white/65">{t(p.category, p.ar?.category ?? p.category)}</span>
                      </span>
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
