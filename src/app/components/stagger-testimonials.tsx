"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { useLang, useT } from "./i18n";

const SQRT_5000 = Math.sqrt(5000);

// AKAL brand colors
const BRAND = "#1E504D";
const CENTER_BG = "#0C0E0F";

type Testimonial = {
  tempId: number;
  textAr: string;
  textFr: string;
  byAr: string;
  byFr: string;
  productAr: string;
  productFr: string;
  avatar: string;
  avatarBg: string;
};

const baseTestimonials: Omit<Testimonial, "tempId">[] = [
  {
    textAr: "جربت سكر التمر من أكال وأنا لا أقدر أرجع للسكر الأبيض! الطعم مختلف تماماً والإحساس بعده بالراحة والخفة.",
    textFr: "J'ai essayé le sucre de dattes AKAL et je ne peux plus revenir au sucre blanc ! Le goût est incomparable.",
    byAr: "فاطمة ز. · مراكش",
    byFr: "Fatima Z. · Marrakech",
    productAr: "سكر التمر",
    productFr: "Sucre de dattes",
    avatar: "ف",
    avatarBg: "#D4E8D0",
  },
  {
    textAr: "المسكة الحرة من أكال نقية بشكل لا يصدق. مختلفة تماماً عما يباع في الأسواق. التوصيل سريع والتغليف ممتاز.",
    textFr: "Le mastic d'AKAL est d'une pureté incroyable. Totalement différent de ce qu'on trouve en grande surface. Livraison rapide !",
    byAr: "يوسف ب. · الدار البيضاء",
    byFr: "Youssef B. · Casablanca",
    productAr: "المسكة الحرة",
    productFr: "Mastic pur",
    avatar: "ي",
    avatarBg: "#FEF3C7",
  },
  {
    textAr: "ماء الورد من أكال رائحته بديعة ونقاؤه لا نظير له. أضيفه في الرايب والحلوى وكل من يذوقه يطلب المزيد!",
    textFr: "L'eau de rose AKAL sent divinement bon ! Je l'utilise dans mes desserts et tout le monde en redemande.",
    byAr: "خديجة م. · فاس",
    byFr: "Khadija M. · Fès",
    productAr: "ماء الورد",
    productFr: "Eau de rose",
    avatar: "خ",
    avatarBg: "#FCE7F3",
  },
  {
    textAr: "دبس التمر من أكال أحسن من العسل! أستعمله مع الخبز كل صباح. القوام كثيف مثالي والطعم الكرميلي لا يُقاوم.",
    textFr: "Le sirop de dattes est meilleur que le miel ! Je l'utilise chaque matin sur mon pain. La texture est parfaite.",
    byAr: "أحمد ر. · الرباط",
    byFr: "Ahmed R. · Rabat",
    productAr: "دبس التمر",
    productFr: "Sirop de dattes",
    avatar: "أ",
    avatarBg: "#DBEAFE",
  },
  {
    textAr: "زبدة طبيعية بجودة لا تضاهى. تحس بالفرق من أول لقمة. أطفالي رفضوا أي زبدة أخرى بعدها!",
    textFr: "Beurre naturel de qualité irréprochable. On sent la différence dès la première bouchée. Mes enfants n'acceptent plus rien d'autre !",
    byAr: "سلمى ك. · أكادير",
    byFr: "Salma K. · Agadir",
    productAr: "الزبدة الطبيعية",
    productFr: "Beurre naturel",
    avatar: "س",
    avatarBg: "#D1FAE5",
  },
  {
    textAr: "طلبت لأول مرة بتردد، لكن المفاجأة كانت رائعة! منتج طبيعي 100%، توصيل في الوقت، والدفع عند الاستلام بأمان تام.",
    textFr: "J'ai commandé avec hésitation, mais quelle belle surprise ! Produit 100% naturel, livraison parfaite, paiement à la livraison en toute sécurité.",
    byAr: "نادية ح. · مكناس",
    byFr: "Nadia H. · Meknès",
    productAr: "سكر التمر",
    productFr: "Sucre de dattes",
    avatar: "ن",
    avatarBg: "#EDE9FE",
  },
  {
    textAr: "منتجات أكال حولت طريقة أكلنا في البيت. الكل يسأل من أين نجيب هذا الطعم الطبيعي! شكراً جزيلاً.",
    textFr: "Les produits AKAL ont transformé notre façon de manger. Tout le monde demande d'où vient ce goût naturel !",
    byAr: "لطيفة م. · طنجة",
    byFr: "Latifa M. · Tanger",
    productAr: "دبس التمر",
    productFr: "Sirop de dattes",
    avatar: "ل",
    avatarBg: "#FEE2E2",
  },
  {
    textAr: "جودة استثنائية وخدمة ممتازة. أوصي بأكال لكل من يبحث عن منتجات حقيقية بدون مواد حافظة. سأطلب دائماً!",
    textFr: "Qualité exceptionnelle et service excellent. Je recommande AKAL à tous ceux qui cherchent des produits vrais sans conservateurs.",
    byAr: "كريم ب. · وجدة",
    byFr: "Karim B. · Oujda",
    productAr: "المسكة الحرة",
    productFr: "Mastic pur",
    avatar: "ك",
    avatarBg: "#FEF9C3",
  },
];

const initTestimonials: Testimonial[] = baseTestimonials.map((t, i) => ({
  ...t,
  tempId: i,
}));

interface CardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
  isAr: boolean;
}

const TestimonialCard: React.FC<CardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  isAr,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-7 transition-all duration-500 ease-in-out select-none",
        isCenter ? "z-10" : "z-0 hover:border-[#344E2F]/40"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        background: isCenter ? CENTER_BG : "white",
        borderColor: isCenter ? CENTER_BG : "#e5e7eb",
        color: isCenter ? "white" : "#1a1a1a",
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px rgba(0,0,0,0.12)"
          : "0px 0px 0px 0px transparent",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Corner cut line */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 38,
          width: SQRT_5000,
          height: 2,
          background: isCenter ? "rgba(255,255,255,0.3)" : "#e5e7eb",
        }}
      />

      {/* Name + Product row */}
      <div className={`mb-4 flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
        <div className="flex flex-col min-w-0">
          <span
            className="text-sm font-bold leading-tight"
            style={{
              color: isCenter ? "white" : "#111827",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {isAr ? testimonial.byAr : testimonial.byFr}
          </span>
          {/* Product tag inline */}
          <span
            className="mt-0.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold self-start"
            style={{
              background: isCenter ? "rgba(255,255,255,0.12)" : "#EAF2ED",
              color: isCenter ? "rgba(255,255,255,0.85)" : BRAND,
            }}
          >
            {isAr ? testimonial.productAr : testimonial.productFr}
          </span>
        </div>
      </div>

      {/* Quote text */}
      <p
        className="text-sm leading-relaxed font-medium line-clamp-5"
        style={{
          fontFamily: "var(--font-tajawal), 'Tajawal', sans-serif",
          color: isCenter ? "rgba(255,255,255,0.90)" : "#374151",
        }}
      >
        «&nbsp;{isAr ? testimonial.textAr : testimonial.textFr}&nbsp;»
      </p>
    </div>
  );
};

export default function StaggerTestimonials() {
  const t = useT();
  // Same language source as the rest of the site (French on the server and first render).
  const isAr = useLang().lang === "ar";

  const [cardSize, setCardSize] = useState(340);
  const [list, setList] = useState(initTestimonials);

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const update = () => {
      setCardSize(window.matchMedia("(min-width: 640px)").matches ? 340 : 270);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="w-full py-20 max-lg:py-14 overflow-hidden">
      {/* Section header */}
      <div className="flex flex-col items-center text-center gap-4 mb-12 px-5">
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase border border-white/20 shadow-2xs"
          style={{ fontFamily: "var(--font-tajawal), 'Tajawal', sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7E36B] animate-pulse" />
          {t("Ce que disent nos clients", "ما يقوله عملاؤنا")}
        </span>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-[1.2]"
          style={{ fontFamily: "var(--font-tajawal), 'Tajawal', sans-serif" }}
        >
          {t("Ils ont essayé, ils ont adoré", "جربوا وأحبوا — شهادات حقيقية")}
        </h2>

        {/* High-end Rating & Trust Badge */}
        <div className="inline-flex items-center gap-3 sm:gap-4 mt-1 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white border border-black/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.05)] backdrop-blur-md">
          {/* 5 solid golden stars with crisp glow */}
          <div className="flex items-center gap-1 shrink-0" dir="ltr" aria-label="5 étoiles sur 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-[#F59E0B] text-[#F59E0B] drop-shadow-[0_1px_2px_rgba(245,158,11,0.25)] shrink-0"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-4.5 sm:h-5 bg-black/10 shrink-0" />

          {/* Rating score + Verified count */}
          <div className="flex items-center gap-2 sm:gap-2.5 [font-family:var(--font-tajawal),sans-serif]">
            <span className="text-sm sm:text-base font-black text-color-001" dir="ltr">
              4.9 <span className="text-xs font-semibold text-muted-foreground">/ 5</span>
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#1E504D] flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#E6F2EA] flex items-center justify-center text-[10px] text-[#1E504D] font-bold shrink-0">✓</span>
              <span>{t("+200 avis vérifiés", "+200 تقييم موثق")}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Cards stage */}
      <div className="relative w-full overflow-hidden" style={{ height: 540 }}>
        {list.map((testimonial, index) => {
          const position =
            list.length % 2
              ? index - (list.length + 1) / 2
              : index - list.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
              isAr={isAr}
            />
          );
        })}

        {/* Nav buttons */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3 z-20">
          <button
            onClick={() => handleMove(-1)}
            className="flex h-12 w-12 items-center justify-center border border-black/10 bg-white text-color-001 hover:bg-[#344E2F] hover:text-white hover:border-[#344E2F] transition-all rounded-full shadow-md hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E504D] cursor-pointer"
            aria-label={t("Précédent", "السابق")}
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
          <button
            onClick={() => handleMove(1)}
            className="flex h-12 w-12 items-center justify-center border border-black/10 bg-white text-color-001 hover:bg-[#344E2F] hover:text-white hover:border-[#344E2F] transition-all rounded-full shadow-md hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E504D] cursor-pointer"
            aria-label={t("Suivant", "التالي")}
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
}
