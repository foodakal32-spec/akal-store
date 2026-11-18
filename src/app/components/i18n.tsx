"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "ar";

const KEY = "akal-lang";
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "fr", setLang: () => {} });

/**
 * Site language (French by default). Stored in the browser; sets <html lang>.
 * The text direction is NOT set on <html>: Chromium renders the page-transition
 * snapshots blank when the root is right-to-left. <LangDir> applies it inside
 * the transition wrapper instead.
 */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "ar" || saved === "fr") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Wraps the page content with the language's direction (rtl for Arabic). */
export function LangDir({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
      {children}
    </div>
  );
}

/** Picks the French or Arabic text. */
export function useT() {
  const { lang } = useLang();
  return (fr: string, ar?: string) => (lang === "ar" && ar ? ar : fr);
}

/** Inline translated text, usable from server components. */
export function T({ fr, ar }: { fr: string; ar?: string }) {
  const { lang } = useLang();
  return <>{lang === "ar" && ar ? ar : fr}</>;
}
