import { T } from "../components/i18n";
import SiteLink from "../components/site-link";
import SiteHeader from "../components/site-header";
import ProductTile from "../components/product-tile";
import LogoCloudSection from "../sections/logo-cloud-section";
import { productDetails } from "../product-data";

export const metadata = {
  title: "Tous les produits — AKAL أكال",
  description: "Tous les produits AKAL : naturels, faits maison, 100% à la main, sans conservateurs.",
};

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

export default function ProduitsPage() {
  return (
    <main className="w-full min-h-screen relative theme-beige">
      {/* Fixed Background Image with Liquid Glass Layer across the entire viewport */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/assets/product-background.png"
          alt="AKAL Products Background"
          className="w-full h-full object-cover object-center scale-105 blur-[28px] saturate-[1.8]"
        />
        {/* Full Liquid Glass Tint & Edge Glow */}
        <div className="absolute inset-0 bg-[#0e2a3a]/30 [box-shadow:inset_0_0_120px_rgba(0,0,0,0.3)]" />
      </div>

      <section className="w-full relative z-10 pb-25 max-lg:pb-16">
        <SiteHeader plainNav />

        <div className="w-full max-w-337.5 mx-auto px-10 pt-16 pb-14 max-lg:px-5 max-lg:pt-10 max-lg:pb-10">
          <h1 className={`text-[2.5rem] font-bold leading-[2.75rem] tracking-[-1.56px] text-white drop-shadow-md max-lg:text-[1.875rem] max-lg:leading-9 ${font}`}><T fr="Tous nos produits" ar="جميع منتجاتنا" /></h1>
          <p className={`mt-3 max-w-150 text-base leading-6 text-white drop-shadow max-lg:text-base ${font}`}><T fr="Produits naturels faits maison, sans conservateurs." ar="منتجات طبيعية منزلية الصنع، بدون مواد حافظة." /></p>
        </div>

        <div id="products" className="w-full max-w-337.5 mx-auto px-10 grid grid-cols-4 gap-6 max-lg:px-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-3">
          {productDetails.map((p) => (
            <ProductTile key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <div className="relative z-10">
        <LogoCloudSection />
      </div>
    </main>
  );
}
