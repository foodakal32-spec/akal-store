import { T } from "../components/i18n";
import SiteLink from "../components/site-link";
import SiteHeader from "../components/site-header";
import ProductCard from "../components/product-card";
import LogoCloudSection from "../sections/logo-cloud-section";
import { ProductCard_cids } from "../_cids";
import { ProductCard_styles } from "../_styles";
import { products } from "../content";

export const metadata = {
  title: "Tous les produits — AKAL أكال",
  description: "Tous les produits AKAL : naturels, faits maison, 100% à la main, sans conservateurs.",
};

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

export default function ProduitsPage() {
  return (
    <main className="w-full min-h-screen relative bg-[#0e2a3a]">
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
          <h1 className={`text-[3.25rem] font-bold leading-[3.4375rem] tracking-[-1.56px] text-white drop-shadow-md max-lg:text-[2.5rem] max-lg:leading-10.5 ${font}`}><T fr="Tous nos produits" ar="جميع منتجاتنا" /></h1>
          <p className={`mt-5 max-w-150 text-lg leading-7 text-white drop-shadow max-lg:text-base ${font}`}><T fr="Produits naturels faits maison, 100% à la main, sans conservateurs, pour une vie plus saine." ar="منتجات طبيعية منزلية الصنع، مصنوعة يدوياً 100%، بدون مواد حافظة، لحياة أكثر صحة." /></p>
        </div>

        <div id="products" className="w-full max-w-337.5 mx-auto px-10 grid grid-cols-3 gap-8 max-lg:px-5 max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:gap-5">
          {products.map((d, i) => (
            <ProductCard key={i} d={d} cids={ProductCard_cids[i % ProductCard_cids.length]} styles={ProductCard_styles[i % ProductCard_styles.length]} />
          ))}
        </div>
      </section>

      <div className="relative z-10">
        <LogoCloudSection />
      </div>
    </main>
  );
}
