"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useCart } from "./cart-provider";
import { useLang, useT } from "./i18n";
import { formatPrice, localize, sizeLabel, type ProductDetail } from "../product-data";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

type FlyingItem = { id: number; startX: number; startY: number; deltaX: number; deltaY: number; image: string };

function Sparkle({ className = "", size = 22 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <path d="M12 2c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" fill="currentColor" />
    </svg>
  );
}

function Check() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#344E2F] text-white" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
    </span>
  );
}

/** Mobile-only product screen (below the md breakpoint): hero image, info, tabs, format picker, CTA. */
export default function ProductMobile({ product }: { product: ProductDetail }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [tab, setTab] = useState(0);
  const [added, setAdded] = useState(false);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const cart = useCart();
  const router = useRouter();
  const { lang } = useLang();
  const t = useT();
  const p = localize(product, lang);
  const size = product.sizes[sizeIndex];
  const image = product.images[0] || "";

  useEffect(() => setMounted(true), []);

  const item = () => size && { slug: product.slug, name: product.name, size: size.label, price: size.price, qty: 1, image: product.images[0] };

  function addToCart() {
    const it = item();
    if (!it) return;
    // Fly a thumbnail from the button to the visible cart icon in the header.
    const btn = btnRef.current?.getBoundingClientRect();
    const target = Array.from(document.querySelectorAll<HTMLElement>('a[href="/panier"]')).find((a) => a.offsetParent !== null)?.getBoundingClientRect();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    if (!btn || !target) return cart.add(it);
    const startX = btn.left + btn.width / 2;
    const startY = btn.top + btn.height / 2;
    const id = Date.now() + Math.random();
    setFlyingItems((prev) => [...prev, { id, startX, startY, deltaX: target.left + target.width / 2 - startX, deltaY: target.top + target.height / 2 - startY, image }]);
    setTimeout(() => {
      cart.add(it);
      setFlyingItems((prev) => prev.filter((f) => f.id !== id));
    }, 870);
  }

  function buyNow() {
    const it = item();
    if (!it) return;
    cart.add(it);
    router.push("/commande");
  }

  const tabs = [
    { label: t("Description", "الوصف"), text: p.description },
    { label: t("Utilisation", "طريقة الاستعمال"), text: p.usage },
    { label: t("Ingrédients", "المكوّنات"), text: p.ingredients },
  ].filter((x) => x.text);
  const current = tabs[Math.min(tab, tabs.length - 1)];

  const points = [
    t("100 % naturel, sans conservateurs", "طبيعي 100% وبدون مواد حافظة"),
    t("Fait main au Maroc", "مصنوع يدوياً في المغرب"),
    p.shelfLife ? t("Longue conservation", "مدة حفظ طويلة") : null,
  ].filter(Boolean) as string[];

  return (
    <div className={`relative w-full bg-white ${font}`}>
      {/* Image stage */}
      <div className="relative w-full overflow-hidden bg-[#EAE3D2]">
        {p.badge && (
          <span className="absolute top-4 start-4 z-10 rounded-xl border-2 border-white bg-white/25 px-3.5 py-1.5 text-base font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] backdrop-blur-sm [text-shadow:0_1px_4px_rgba(0,0,0,0.25)]">
            {p.badge}
          </span>
        )}
        <Sparkle className="top-8 end-8 text-[#2B2B2B]" size={26} />
        <Sparkle className="top-[42%] end-6 text-white" size={18} />
        <Sparkle className="bottom-10 start-6 text-[#C6A664]" size={16} />
        <img src={image} alt={p.name} className="relative mx-auto block aspect-square w-full object-cover" />
      </div>

      <div className="relative px-5 pt-5">
        <h1 className="text-[1.75rem] font-bold leading-8 tracking-[-0.5px] text-[#2B2B2B]">{p.name}</h1>
        {p.short && <p className="mt-1.5 text-base font-medium text-[#344E2F]">{p.short}</p>}

        {size && (
          <div className="mt-3 flex items-center gap-3" aria-live="polite">
            <span className="text-2xl font-bold text-[#2B2B2B]">{formatPrice(size.price, lang)}</span>
            <span className="rounded-full bg-[#F3EAD3] px-3 py-1 text-sm font-semibold text-[#9C7F3C]">{sizeLabel(size.label, lang)}</span>
            <span className="ms-auto flex items-center gap-1.5 text-sm text-[#6B8F4E]">
              <span className="h-2 w-2 rounded-full bg-[#6B8F4E]" aria-hidden="true" />
              {t("En stock", "متوفر")}
            </span>
          </div>
        )}

        {/* Soft wave divider */}
        <svg viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true" className="-mx-5 mt-4 block h-8 w-[calc(100%+2.5rem)] text-[#F5F1E8]">
          <path d="M0 22C60 4 120 4 200 18s150 20 200 2v20H0Z" fill="currentColor" />
        </svg>

        <div className="-mx-5 bg-[#F5F1E8] px-5 pb-10">
          {/* Info tabs */}
          {tabs.length > 0 && (
            <>
              <div role="tablist" className="flex flex-wrap gap-2 pt-1">
                {tabs.map((x, i) => (
                  <button
                    key={x.label}
                    type="button"
                    role="tab"
                    aria-selected={current === x}
                    onClick={() => setTab(i)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${current === x ? "bg-[#344E2F] text-white" : "bg-white text-[#344E2F] shadow-[0_1px_4px_rgba(43,43,43,0.08)]"}`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
              <p role="tabpanel" className="mt-3 text-[0.95rem] leading-6 text-[#4A4A4A]">{current.text}</p>
            </>
          )}

          <ul className="mt-4 flex flex-col gap-3">
            {points.map((s) => (
              <li key={s} className="flex items-center gap-3 text-base text-[#2B2B2B]"><Check />{s}</li>
            ))}
          </ul>

          {/* Format picker */}
          {product.sizes.length > 0 && (
            <div className="mt-6">
              <h2 className="text-base font-semibold text-[#2B2B2B]">{t("Choisir le format", "اختر الحجم")}</h2>
              <div role="radiogroup" aria-label={t("Format", "الحجم")} className="mt-3 grid grid-cols-3 gap-2.5">
                {product.sizes.map((s, i) => {
                  const on = i === sizeIndex;
                  return (
                    <button
                      key={s.label}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setSizeIndex(i)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border-[1.5px] border-dashed p-2 transition-colors ${on ? "border-[#344E2F] bg-[#E4EDE0]" : "border-[#2B2B2B]/25 bg-white"}`}
                    >
                      <span className="text-[0.95rem] font-semibold text-[#2B2B2B]">{sizeLabel(s.label, lang)}</span>
                      <img src={image} alt="" className="aspect-square w-full rounded-lg object-cover" />
                      <span className="text-[0.95rem] font-bold text-[#2B2B2B]">{formatPrice(s.price, lang)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            ref={btnRef}
            type="button"
            onClick={addToCart}
            disabled={!size}
            className="mt-6 flex bg-[#344E2F] h-14 w-full items-center justify-center gap-2.5 rounded-2xl text-lg font-semibold text-white shadow-[0_6px_16px_rgba(52,78,47,0.3)] transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {added ? (
              <>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                {t("Ajouté au panier", "تمت الإضافة إلى السلة")}
              </>
            ) : (
              t("Ajouter au panier", "أضف إلى السلة")
            )}
          </button>

          <button
            type="button"
            onClick={buyNow}
            disabled={!size}
            className="mt-3 flex h-14 w-full items-center justify-center rounded-2xl bg-[#C6A664] text-lg font-bold text-[#2B2B2B] shadow-[0_4px_14px_rgba(198,166,100,0.45)] transition-all hover:bg-[#b99a58] active:scale-[0.98] disabled:opacity-50"
          >
            {t("Acheter maintenant", "اشترِ الآن")}
          </button>

          <p className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-[#E4EDE0] px-4 py-1.5 text-sm text-[#344E2F]">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 6h13v10H1z" /><path d="M14 9h4l3 3v4h-7z" /><circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
            {t("Paiement à la livraison", "الدفع عند الاستلام")}
          </p>
        </div>
      </div>

      {mounted &&
        flyingItems.length > 0 &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden" aria-hidden="true">
            {flyingItems.map((f) => (
              <div
                key={f.id}
                style={{ position: "fixed", left: `${f.startX}px`, top: `${f.startY}px`, "--dx": `${f.deltaX}px`, "--dy": `${f.deltaY}px` } as React.CSSProperties}
                className="-ml-8 -mt-8 fly-x pointer-events-none"
              >
                <div className="fly-y">
                  <div className="fly-pop flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#344E2F] bg-white p-1 shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                    <img src={f.image} alt="" className="h-full w-full rounded-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
