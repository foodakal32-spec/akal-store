"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SiteLink from "./site-link";
import OfferButton from "./offer-button";
import { useCart } from "./cart-provider";
import { T, useLang, useT } from "./i18n";
import { formatPrice, localize, sizeLabel, type ProductDetail } from "../product-data";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";
const GREEN = "#2F8A4C";

type FlyingItem = {
  id: number;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  image: string;
};

/** Mobile-only product screen (below the md breakpoint), matching the app-style reference. */
export default function ProductMobile({ product }: { product: ProductDetail }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [cartBumping, setCartBumping] = useState(false);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const cartRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const cart = useCart();
  const { lang } = useLang();
  const t = useT();
  const p = localize(product, lang);
  const size = product.sizes[sizeIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  function addToCart() {
    if (!size) return;

    const btn = btnRef.current?.getBoundingClientRect();
    const cartEl = cartRef.current?.getBoundingClientRect();

    if (btn && cartEl) {
      const startX = btn.left + btn.width / 2;
      const startY = btn.top + btn.height / 2;
      const endX = cartEl.left + cartEl.width / 2;
      const endY = cartEl.top + cartEl.height / 2;

      const id = Date.now() + Math.random();
      const item: FlyingItem = {
        id,
        startX,
        startY,
        deltaX: endX - startX,
        deltaY: endY - startY,
        image: product.images[0] || "",
      };

      setFlyingItems((prev) => [...prev, item]);
      setAdded(true);

      // When the flying order reaches the cart basket at 650ms:
      setTimeout(() => {
        cart.add({
          slug: product.slug,
          name: product.name,
          size: size.label,
          price: size.price,
          qty: 1,
          image: product.images[0],
        });
        setCartBumping(true);
        setFlyingItems((prev) => prev.filter((f) => f.id !== id));
        setTimeout(() => setCartBumping(false), 550);
      }, 870);

      setTimeout(() => setAdded(false), 2200);
    } else {
      cart.add({
        slug: product.slug,
        name: product.name,
        size: size.label,
        price: size.price,
        qty: 1,
        image: product.images[0],
      });
      setAdded(true);
      setCartBumping(true);
      setTimeout(() => setCartBumping(false), 550);
      setTimeout(() => setAdded(false), 2000);
    }
  }

  const cols = Math.min(product.sizes.length, 3);

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col bg-[#E4EDE0] overflow-hidden">
      <img ref={imgRef} src={product.images[0]} alt={product.name} className="absolute top-0 inset-x-0 w-full h-auto [mask-image:linear-gradient(to_bottom,#000_82%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_82%,transparent)]" />
      {/* Product image area */}
      <div className="relative w-full flex-1 min-h-[22rem]">

        <SiteLink
          href="/produits"
          aria-label={t("Retour aux produits", "العودة إلى المنتجات")}
          className="absolute top-6 start-4 w-11 h-11 flex items-center justify-center rounded-full glass-btn text-[#1A1A1A]"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.5 18-6-6 6-6" className="rtl:[transform:scaleX(-1)] rtl:[transform-origin:center]" /></svg>
        </SiteLink>

        <div className="absolute top-6 end-4 flex items-center gap-2.5">
          <div ref={cartRef} className="relative">
            <SiteLink
              href="/panier"
              aria-label={`${t("Panier", "السلة")}${cart.ready && cart.count ? ` (${cart.count})` : ""}`}
              className={`relative w-11 h-11 flex items-center justify-center rounded-full glass-btn text-[#1A1A1A] transition-all duration-300 ${
                cartBumping
                  ? "scale-130 shadow-[0_0_24px_rgba(47,138,76,0.5)] ring-2 ring-[#2F8A4C]"
                  : "scale-100"
              }`}
            >
              {cartBumping && (
                <span className="absolute inset-0 rounded-full bg-[#2F8A4C] animate-ping opacity-45 pointer-events-none" />
              )}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cartBumping ? "rotate-[-10deg] transition-transform duration-300" : "transition-transform duration-300"}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
              {cart.ready && cart.count > 0 && (
                <span className={`absolute -top-1 -end-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full text-[0.6875rem] font-bold leading-none transition-all duration-300 [font-family:Inter,_sans-serif] ${
                  cartBumping
                    ? "bg-[#2F8A4C] text-white scale-125 shadow-md"
                    : "bg-[#C9A24A] text-[#0C0E0F] scale-100"
                }`}>{cart.count}</span>
              )}
            </SiteLink>
          </div>
        </div>
      </div>

      {/* White sheet */}
      <div className="relative z-10 mx-2.5 mb-2.5 -mt-6 rounded-[1.75rem] sheet-glass px-5 pt-2 pb-4">
        <div className="mx-auto h-1 w-9 rounded-full" style={{ backgroundColor: GREEN }} />
        <h1 className={`mt-4 text-[2.25rem] font-bold leading-[2.6rem] text-[#1A1A1A] ${font}`}>{p.name}</h1>

        <p className={`mt-1 text-base leading-6 text-[#5F5F5F] ${font}`}>{p.short}</p>

        {size && (
          <p className={`mt-2 text-xl font-bold ${font}`} style={{ color: GREEN }} aria-live="polite">
            {formatPrice(size.price, lang)}
          </p>
        )}

        {product.sizes.length > 0 && (
          <div role="radiogroup" aria-label={t("Taille", "الحجم")} className="mt-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {product.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="radio"
                aria-checked={i === sizeIndex}
                onClick={() => setSizeIndex(i)}
                className={`h-10 flex items-center justify-between gap-1.5 rounded-full px-3 text-sm text-[#1A1A1A] transition-colors ${font} ${i === sizeIndex ? "bg-[#DCEBDD]/90 font-medium" : "bg-white/55"}`}
              >
                <span className="whitespace-nowrap">{sizeLabel(s.label, lang)}</span>
                <span className="whitespace-nowrap">{formatPrice(s.price, lang)}</span>
              </button>
            ))}
          </div>
        )}

        <div ref={btnRef} className="mt-4">
          <OfferButton
            variant="block"
            className={`w-full transition-all duration-300 ${added ? "offer-btn--added" : ""}`}
            onClick={addToCart}
            disabled={!size}
            label={
              <span className="flex items-center justify-center gap-2.5 transition-all duration-300">
                {added ? (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="#1e4a2e"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-[#1e4a2e] font-extrabold">
                      {t("Ajouté au panier ✓", "تمت الإضافة بنجاح ✓")}
                    </span>
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-75"
                      aria-hidden="true"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <span>{t("Ajouter au panier", "أضف إلى السلة")}</span>
                  </>
                )}
              </span>
            }
          />
        </div>
      </div>

      {/* Parabolic Flying Items Throw Portal */}
      {mounted &&
        flyingItems.length > 0 &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden" aria-hidden="true">
            {flyingItems.map((item) => (
              <div
                key={item.id}
                style={
                  {
                    position: "fixed",
                    left: `${item.startX}px`,
                    top: `${item.startY}px`,
                    "--dx": `${item.deltaX}px`,
                    "--dy": `${item.deltaY}px`,
                  } as React.CSSProperties
                }
                className="-ml-8 -mt-8 fly-x pointer-events-none"
              >
                <div className="fly-y">
                  <div className="fly-pop w-16 h-16 rounded-full bg-white p-1 shadow-[0_12px_28px_rgba(0,0,0,0.35)] border-2 border-[#2F8A4C] flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt="" className="w-full h-full object-cover rounded-full" />
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
