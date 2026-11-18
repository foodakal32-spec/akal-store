"use client";

import SiteLink from "./site-link";
import OfferButton from "./offer-button";
import { useCart } from "./cart-provider";
import { formatPrice, localize, productDetails, shippingFor, sizeLabel } from "../product-data";
import { useLang, useT, type Lang } from "./i18n";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

function nameOf(slug: string, fallback: string, lang: Lang) {
  const p = productDetails.find((d) => d.slug === slug);
  return p ? localize(p, lang).name : fallback;
}


/** Cart page content: items, quantities, total and the WhatsApp order. */
export default function CartView() {
  const { items, total, count, ready, setQty, remove } = useCart();
  const { lang } = useLang();
  const t = useT();

  if (!ready) {
    return <p className={`py-20 text-center text-lg text-white/70 ${font}`}>{t("Chargement du panier…", "جارٍ تحميل السلة…")}</p>;
  }

  if (items.length === 0) {
    return (
      <div className="py-24 max-lg:py-16 flex flex-col items-center gap-6 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-3xl shadow-inner">
          🛒
        </div>
        <div className="flex flex-col gap-3">
          <h2 className={`text-4xl max-lg:text-3xl font-extrabold text-white drop-shadow-md tracking-tight ${font}`}>
            {t("Votre panier est vide", "سلتك فارغة")}
          </h2>
          <p className={`text-lg max-lg:text-base font-medium text-white/80 leading-relaxed drop-shadow ${font}`}>
            {t("Ajoutez des produits naturels pour préparer votre commande.", "أضف منتجات طبيعية لتحضير طلبك والاستمتاع بتجربة تسوق فريدة.")}
          </p>
        </div>
        <SiteLink
          href="/produits"
          className={`mt-2 h-14 px-10 flex items-center justify-center rounded-[99px] bg-[#1E504D] hover:bg-[#20516f] active:scale-95 text-base font-bold text-white shadow-xl transition-all border border-white/15 ${font}`}
        >
          {t("Découvrir nos produits", "اكتشف منتجاتنا")}
        </SiteLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className={`text-[2.75rem] font-bold leading-tight tracking-[-1.5px] text-white drop-shadow-md max-lg:text-3xl ${font}`}>
          {t("Votre panier", "سلتك")} <span className="text-xl font-normal text-white/75">({count})</span>
        </h1>
      </div>

      <div className="grid grid-cols-[1fr_24rem] gap-6 max-lg:gap-5 items-start max-lg:grid-cols-1">
      <ul className="flex flex-col divide-y divide-black/10 rounded-3xl border border-black/[0.06] bg-white card-depth">
        {items.map((i) => (
          <li key={`${i.slug}-${i.size}`} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 p-5">
            {/* Main info row: Image + Name/Price + Mobile Delete Button */}
            <div className="flex items-center justify-between gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <SiteLink href={`/produits/${i.slug}`} className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden bg-surface">
                  <img src={i.image} alt={nameOf(i.slug, i.name, lang)} className="w-full h-full object-cover" />
                </SiteLink>
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <SiteLink href={`/produits/${i.slug}`} className={`text-lg font-semibold text-color-001 truncate ${font}`}>
                    {nameOf(i.slug, i.name, lang)}
                  </SiteLink>
                  <p className={`text-base text-muted-foreground ${font}`}>
                    {sizeLabel(i.size, lang)} · {formatPrice(i.price, lang)}
                  </p>
                </div>
              </div>

              {/* Large delete icon on the far left (mobile) */}
              <button
                type="button"
                onClick={() => remove(i.slug, i.size)}
                aria-label={t("Supprimer", "حذف")}
                title={t("Supprimer", "حذف")}
                className="sm:hidden w-12 h-12 flex items-center justify-center rounded-2xl text-[#DC2626] bg-[#FEE2E2]/70 hover:bg-[#FEE2E2] active:scale-95 transition-all shrink-0 shadow-sm"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </div>

            {/* Stepper + Total Price + Desktop Delete Button */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t border-black/[0.04] sm:border-0">
              <div className="h-11 sm:h-12 flex items-center gap-1 rounded-full border border-black/10 px-1.5" role="group" aria-label={`${t("Quantité", "الكمية")} ${nameOf(i.slug, i.name, lang)}`}>
                <button type="button" onClick={() => setQty(i.slug, i.size, i.qty - 1)} aria-label={t("Diminuer la quantité", "إنقاص الكمية")} className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-xl text-color-001 hover:bg-black/5 active:scale-90 transition-all">−</button>
                <span className={`w-8 text-center text-base font-semibold text-color-001 ${font}`}>{i.qty}</span>
                <button type="button" onClick={() => setQty(i.slug, i.size, i.qty + 1)} aria-label={t("Augmenter la quantité", "زيادة الكمية")} className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-xl text-color-001 hover:bg-black/5 active:scale-90 transition-all">+</button>
              </div>

              <p className={`w-24 text-end text-lg font-bold text-[#1E4A2E] ${font}`}>
                {formatPrice(i.qty * i.price, lang)}
              </p>

              {/* Large delete icon on the far left (desktop) */}
              <button
                type="button"
                onClick={() => remove(i.slug, i.size)}
                aria-label={t("Supprimer", "حذف")}
                title={t("Supprimer", "حذف")}
                className="hidden sm:flex w-11 h-11 items-center justify-center rounded-2xl text-[#DC2626] bg-[#FEE2E2]/60 hover:bg-[#FEE2E2] active:scale-95 transition-all shrink-0 ms-2"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="flex flex-col gap-5 rounded-3xl border border-black/[0.06] bg-white p-6 card-depth lg:sticky lg:top-6">
        <h2 className={`text-2xl font-bold text-color-001 ${font}`}>{t("Récapitulatif", "ملخص الطلب")}</h2>
        <dl className={`flex flex-col gap-3 text-base ${font}`}>
          <div className="flex justify-between"><dt className="text-muted-foreground">{t("Articles", "المنتجات")}</dt><dd className="font-semibold text-color-001">{count}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">{t("Livraison", "التوصيل")}</dt><dd className="font-semibold text-color-001">{shippingFor(total) === 0 ? t("Offerte", "مجاني") : formatPrice(shippingFor(total), lang)}</dd></div>
          <div className="flex justify-between border-t border-black/10 pt-4 text-xl"><dt className="font-semibold text-color-001">{t("Total", "المجموع")}</dt><dd className="font-bold text-[#1E4A2E]">{formatPrice(total + shippingFor(total), lang)}</dd></div>
        </dl>
        <OfferButton
          variant="block"
          href="/commande"
          label={t("Passer la commande", "إتمام الطلب")}
        />

        {/* Reassurance & Trust badges */}
        <div className="w-full rounded-2xl bg-[#F6F4EF] p-4 flex flex-col gap-3.5 border border-black/[0.04]">
          <div className="grid grid-cols-2 gap-3">
            {/* 100% Naturel */}
            <div className="flex flex-col items-center gap-2 text-center p-2.5 rounded-xl bg-white/70 shadow-xs">
              <span className="w-12 h-12 flex items-center justify-center rounded-full border border-black/15 bg-white text-[#1E504D]">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </span>
              <span className={`text-xs sm:text-sm font-bold text-color-001 ${font}`}>
                {t("100% naturel", "طبيعي 100%")}
              </span>
              <span className={`text-[11px] text-muted-foreground ${font}`}>
                {t("Fait maison & sain", "صنع يدوي بدون مواد حافظة")}
              </span>
            </div>

            {/* Delivery to all cities */}
            <div className="flex flex-col items-center gap-2 text-center p-2.5 rounded-xl bg-white/70 shadow-xs">
              <span className="w-12 h-12 flex items-center justify-center rounded-full border border-black/15 bg-white text-[#1E504D]">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                  <circle cx="17" cy="18" r="2" />
                  <circle cx="7" cy="18" r="2" />
                </svg>
              </span>
              <span className={`text-xs sm:text-sm font-bold text-color-001 ${font}`}>
                {t("Toutes les villes", "توصيل لجميع المدن")}
              </span>
              <span className={`text-[11px] text-muted-foreground ${font}`}>
                {t("Partout au Maroc", "إلى باب منزلك بالمغرب")}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-black/[0.06] flex items-center justify-center gap-2 text-xs font-semibold text-[#1E4A2E]">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>{t("Paiement sécurisé à la livraison", "الدفع عند الاستلام بعد معاينة الطلب")}</span>
          </div>
        </div>
      </aside>
      </div>
    </div>
  );
}
