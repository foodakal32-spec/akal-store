"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "./i18n";

/** Hero slogans that take turns (title + subtitle change together). */
const SLIDES = [
  {
    title: { fr: ["La nature telle quelle", "sans rien ajouter."], ar: ["الطبيعة كما هي", "بدون إضافات."] },
    text: {
      fr: "Zéro conservateur zéro sucre raffiné zéro colorant. Juste ce dont votre famille a besoin.",
      ar: "لا مواد حافظة لا سكر مكرر لا ملونات. فقط ما تحتاجه عائلتك.",
    },
  },
  {
    title: { fr: ["Le goût d'antan", "la confiance d'aujourd'hui."], ar: ["طعم زمان", "بثقة اليوم."] },
    text: {
      fr: "Les recettes de nos grands-mères préparées à la main avec des ingrédients marocains purs.",
      ar: "وصفات جداتنا نحضّرها يدوياً بمكونات مغربية نقية.",
    },
  },
];

const INTERVAL = 5000;

// Shared tick so title and subtitle stay in sync.
let listeners: ((n: number) => void)[] = [];
let current = 0;
let timer: ReturnType<typeof setInterval> | null = null;
function useSharedSlide() {
  const [i, setI] = useState(current);
  useEffect(() => {
    listeners.push(setI);
    if (!timer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setInterval(() => {
        current = (current + 1) % SLIDES.length;
        listeners.forEach((l) => l(current));
      }, INTERVAL);
    }
    return () => {
      listeners = listeners.filter((l) => l !== setI);
      if (!listeners.length && timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, []);
  return i;
}

/**
 * FoldText-style lines ("paper" fold, hinge on top): each unit unfolds from rotateX(-92deg) with a crease shadow,
 * staggered from the start. French is split by characters; Arabic by words (splitting Arabic letters would break their joined shapes).
 */
const FOLD_ANGLE = 92;
const DURATION = 0.65;
const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1]; // power3.out
const CREASE = 0.55;

function SlideLines({ lines, lang, id, step = 0.045 }: { lines: string[]; lang: "fr" | "ar"; id: number; step?: number }) {
  const units = lines.map((line) =>
    line.split(" ").map((word) => (lang === "fr" ? Array.from(word) : [word])),
  );
  let n = 0;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={id}
        className="block"
        aria-label={lines.join(" ")}
        style={{ perspective: 700 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        {units.map((words, li) => (
          <span key={li} className="block" aria-hidden="true">
            {words.map((parts, wi) => (
              <span key={wi} className="inline-flex align-bottom">
                {parts.map((p, pi) => {
                  const delay = n++ * step;
                  return (
                    <motion.span
                      key={pi}
                      className="relative inline-block"
                      style={{ transformOrigin: "50% 0%", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                      initial={{ rotateX: -FOLD_ANGLE, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1, transition: { duration: DURATION, ease: EASE, delay } }}
                    >
                      {p}
                      <motion.span
                        className="pointer-events-none absolute inset-0"
                        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0) 70%)", mixBlendMode: "multiply" }}
                        initial={{ opacity: CREASE }}
                        animate={{ opacity: 0, transition: { duration: DURATION, ease: EASE, delay } }}
                      />
                    </motion.span>
                  );
                })}
                {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}

export function HeroTitle() {
  const { lang } = useLang();
  const i = useSharedSlide();
  return <SlideLines lines={SLIDES[i].title[lang]} lang={lang} id={i} />;
}

export function HeroText() {
  const { lang } = useLang();
  const i = useSharedSlide();
  // Subtitle: word by word in both languages (long sentence).
  return <SlideLines lines={[SLIDES[i].text[lang]]} lang="ar" id={i} step={0.05} />;
}
