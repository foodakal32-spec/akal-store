"use client";

import SiteLink from "./site-link";
import { useLang, useT } from "./i18n";
import { formatPrice, localize, type ProductDetail } from "../product-data";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

/** Shop-style product card: photo on top, category, name and price below. The whole card opens the product page. */
export default function ProductTile({ product }: { product: ProductDetail }) {
  const { lang } = useLang();
  const t = useT();
  const p = localize(product, lang);
  const prices = product.sizes.map((s) => s.price);
  const min = prices.length ? Math.min(...prices) : null;

  return (
    <SiteLink
      href={`/produits/${product.slug}`}
      aria-label={p.name}
      className="group flex h-full flex-col gap-3 overflow-hidden rounded-2xl bg-white p-2.5 pb-4 shadow-[0_2px_14px_rgba(43,43,43,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(43,43,43,0.14)] active:scale-[0.98]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-[#EFEBE0]">
        {product.images[0] && (
          <img
            src={product.images[0]}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col items-start gap-1.5 px-1 text-start">
        <h3 className={`text-[1.15rem] font-bold leading-6 text-[#2B2B2B] ${font}`}>{p.name}</h3>
        {min !== null && (
          <p className={`text-lg font-bold leading-6 text-[#344E2F] ${font}`}>
            {formatPrice(min, lang)}
          </p>
        )}
        <p className={`flex items-center gap-2 text-[0.9rem] text-[#6B8F4E] ${font}`}>
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#6B8F4E]" aria-hidden="true" />
          {t("En stock", "متوفر في المخزون")}
        </p>
      </div>
    </SiteLink>
  );
}
