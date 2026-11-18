"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang, type Lang } from "./i18n";
import { FlagFR, FlagMA } from "./flags";

const LANGS: { code: Lang; label: string; Flag: typeof FlagFR; font: string }[] = [
  { code: "fr", label: "Français", Flag: FlagFR, font: "[font-family:Inter,_'Inter_Placeholder',_sans-serif]" },
  { code: "ar", label: "العربية", Flag: FlagMA, font: "[font-family:var(--font-tajawal),sans-serif]" },
];

/**
 * Language switch: white pill with the current language's flag and name, opening a small menu.
 * "lg" matches the hero nav pill, "sm" the secondary header; shortOnMobile hides the name on phones.
 * The menu is rendered in a portal so the navigation's overflow clipping can't cut it.
 */
export default function LangSwitch({ className = "", size = "lg", shortOnMobile = false }: { className?: string; size?: "lg" | "sm"; shortOnMobile?: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; up: boolean } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  const dims = size === "sm"
    ? (shortOnMobile ? "h-9 px-2.5 max-md:h-8 max-md:px-2 gap-1.5 text-xs" : "h-9.5 px-3.5 gap-2 text-sm")
    : "h-11 px-4 gap-2 text-sm max-md:h-9 max-md:px-3";

  // Place the menu under the button (or above when there is no room below), aligned to its end.
  useLayoutEffect(() => {
    if (!open || !btnRef.current) return;
    const place = () => {
      const r = btnRef.current!.getBoundingClientRect();
      const menuW = 180;
      const menuH = 100;
      const up = r.bottom + 8 + menuH > window.innerHeight && r.top > menuH + 8;
      const rtl = getComputedStyle(btnRef.current!).direction === "rtl";
      // Align with the button's end edge; if that doesn't fit, align with its start edge instead.
      let left = rtl ? r.left : r.right - menuW;
      if (left < 8) left = r.left;
      if (left + menuW > window.innerWidth - 8) left = r.right - menuW;
      left = Math.max(8, Math.min(left, window.innerWidth - menuW - 8));
      setPos({ top: up ? r.top - 8 - menuH : r.bottom + 8, left, up });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open]);

  // Close on outside click / Escape; focus the current item when opening.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (code: Lang) => {
    setOpen(false);
    if (code !== lang) setLang(code);
    btnRef.current?.focus();
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={lang === "ar" ? `اللغة: ${current.label}` : `Langue : ${current.label}`}
        className={`${dims} flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 text-white border border-white/20 backdrop-blur-md shadow-sm cursor-pointer shrink-0 transition-all ${current.font} ${className}`}
      >
        <current.Flag className="w-5 h-3.5 shrink-0 rounded-[2px] shadow-sm" />
        <span className={shortOnMobile ? "max-md:hidden" : ""}>{current.label}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 opacity-80 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>

      {open &&
        pos &&
        createPortal(
          <ul
            ref={menuRef}
            role="menu"
            dir={lang === "ar" ? "rtl" : "ltr"}
            style={{ position: "fixed", top: pos.top, left: pos.left, width: 180 }}
            className="z-[100] flex flex-col gap-1 rounded-2xl bg-[#143B38]/95 backdrop-blur-xl p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-white/15 text-white"
          >
            {LANGS.map((l) => (
              <li key={l.code} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={l.code === lang}
                  lang={l.code}
                  onClick={() => choose(l.code)}
                  className={`w-full h-10 flex items-center gap-2.5 rounded-xl px-2.5 text-sm font-semibold transition-colors outline-none ${
                    l.code === lang
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  } ${l.font}`}
                >
                  <l.Flag className="w-5 h-3.5 shrink-0 rounded-[2px] shadow-sm" />
                  <span className="flex-1 text-start">{l.label}</span>
                  {l.code === lang && (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#86EFAC" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  )}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </>
  );
}
