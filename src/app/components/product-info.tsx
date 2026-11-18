"use client";

import { useState } from "react";
import TrustBadges from "./trust-badges";
import SiteLink from "./site-link";
import { useCart } from "./cart-provider";
import { useLang, useT } from "./i18n";
import { formatPrice, localize, sizeLabel, WHATSAPP_URL, type ProductDetail } from "../product-data";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

/** Product information panel: size picker, live price, quantity and WhatsApp order. */
export default function ProductInfo({ product }: { product: ProductDetail }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [shared, setShared] = useState(false);
  const [added, setAdded] = useState(false);
  const cart = useCart();
  const { lang } = useLang();
  const t = useT();
  const p = localize(product, lang);
  const size = product.sizes[sizeIndex];

  const details = [
    { label: t("Ingrédients", "المكوّنات"), value: p.ingredients },
    { label: t("Utilisation", "طريقة الاستعمال"), value: p.usage },
    { label: t("Bienfaits", "الفوائد"), value: p.benefits },
    { label: t("Conservation", "الحفظ"), value: p.shelfLife },
  ].filter((d) => d.value);

  function addToCart() {
    if (!size) return;
    cart.add({ slug: product.slug, name: product.name, size: size.label, price: size.price, qty, image: product.images[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${p.name} — AKAL`, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* share cancelled */
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-black/5 bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] max-md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className={`text-base font-semibold text-[#8A6A1F] ${font}`}>{p.category}</p>
          <h1 className={`text-[3.25rem] font-bold leading-[3.4375rem] tracking-[-1.56px] text-color-001 max-lg:text-[2.5rem] max-lg:leading-10.5 ${font}`}>{p.name}</h1>
          {p.nameAr && <p dir="rtl" lang="ar" className={`text-xl font-semibold text-muted-foreground ${font}`}>{p.nameAr}</p>}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {p.badge && <span className={`px-3 py-1 rounded-lg bg-[#1E4A2E] text-sm font-bold text-white ${font}`}>{p.badge}</span>}
          <button type="button" onClick={share} aria-label={t("Partager", "مشاركة")} title={shared ? t("Lien copié", "تم نسخ الرابط") : t("Partager", "مشاركة")} className="w-[3.25rem] h-[3.25rem] flex items-center justify-center rounded-full border border-black/10 text-color-001 hover:bg-surface transition-colors">
            {shared ? (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
            )}
          </button>
        </div>
      </div>

      <p className={`text-xl leading-8 text-[#1E504D] ${font}`}>{p.short}</p>

      {size && (
        <p className={`text-[3.25rem] font-bold leading-none text-[#1E4A2E] max-lg:text-[2.5rem] ${font}`} aria-live="polite">{formatPrice(size.price, lang)}</p>
      )}

      <p className={`text-base leading-[1.625rem] text-muted-foreground ${font}`}>{p.description}</p>

      {product.sizes.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className={`text-lg font-semibold text-color-001 ${font}`}>{t("Taille", "الحجم")}</p>
          <div role="radiogroup" aria-label={t("Taille", "الحجم")} className="flex flex-wrap gap-3">
            {product.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="radio"
                aria-checked={i === sizeIndex}
                onClick={() => setSizeIndex(i)}
                className={`h-[3.75rem] px-7 rounded-full border text-lg transition-colors ${font} ${i === sizeIndex ? "bg-[#1E4A2E] border-[#1E4A2E] text-white" : "bg-white border-black/10 text-color-001 hover:border-black/30"}`}
              >
                {sizeLabel(s.label, lang)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-stretch">
          <div className="h-[4.4rem] flex items-center justify-between gap-2 rounded-full border border-black/10 px-3 max-sm:justify-center max-sm:gap-8" role="group" aria-label={t("Quantité", "الكمية")}>
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label={t("Diminuer la quantité", "إنقاص الكمية")} className="w-12 h-12 flex items-center justify-center rounded-full text-2xl text-color-001 disabled:text-black/25">−</button>
            <span className={`w-10 text-center text-xl font-semibold text-color-001 ${font}`} aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label={t("Augmenter la quantité", "زيادة الكمية")} className="w-12 h-12 flex items-center justify-center rounded-full text-2xl text-color-001">+</button>
          </div>
          <button type="button" onClick={addToCart} disabled={!size} className={`h-[4.4rem] flex-1 flex items-center justify-center gap-3 rounded-full bg-[#1E4A2E] text-lg font-semibold text-white hover:bg-[#173a24] transition-colors disabled:opacity-50 ${font}`}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            {added ? t("Ajouté au panier ✓", "تمت الإضافة ✓") : t("Ajouter au panier", "أضف إلى السلة")}
          </button>
        </div>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`h-[4.4rem] w-full flex items-center justify-center gap-3 rounded-full border border-[#9BE3B5] bg-[#E6F8EC] text-lg font-semibold text-[#0B6B3A] hover:bg-[#d8f3e1] transition-colors ${font}`}>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
          {t("Commander sur WhatsApp", "اطلب عبر واتساب")}
        </a>
        {added && (
          <p role="status" className={`text-sm text-[#1E4A2E] ${font}`}>
            {t("Article ajouté.", "تمت إضافة المنتج.")} <SiteLink href="/panier" className="font-semibold underline">{t("Voir le panier", "عرض السلة")}</SiteLink>
          </p>
        )}
      </div>
      {size && qty > 1 && (
        <p className={`-mt-2 text-sm text-muted-foreground ${font}`}>
          {qty} × {sizeLabel(size.label, lang)} — {t("total", "المجموع")} : {formatPrice(size.price * qty, lang)}
        </p>
      )}

      <TrustBadges />

      {details.length > 0 && (
        <dl className="flex flex-col divide-y divide-black/10 border-y border-black/10">
          {details.map((d) => (
            <div key={d.label} className="py-5 flex flex-col gap-1.5">
              <dt className={`text-base font-semibold text-color-001 ${font}`}>{d.label}</dt>
              <dd className={`text-base leading-[1.625rem] text-muted-foreground ${font}`}>{d.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
