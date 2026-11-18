import { T } from "../../components/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLink from "../../components/site-link";
import SiteHeader from "../../components/site-header";
import GlassBackground from "../../components/glass-background";
import ProductInfo from "../../components/product-info";
import ProductMobile from "../../components/product-mobile";
import LogoCloudSection from "../../sections/logo-cloud-section";
import { getProduct, productDetails } from "../../product-data";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

export function generateStaticParams() {
  return productDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — AKAL أكال`,
    description: `${product.short}. ${product.description}`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main className="w-full min-h-screen relative bg-[#0e2a3a]">
      <GlassBackground />
      <div className="max-md:hidden relative z-10">
      <section className="w-full">
        <SiteHeader plainNav />
      </section>

      <section className="w-full px-10 py-14 max-lg:px-5 max-lg:py-10">
        <div className="w-full max-w-337.5 mx-auto">

          <div className="grid grid-cols-2 gap-14 items-start max-lg:grid-cols-1 max-lg:gap-8">
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-square rounded-[28px] overflow-hidden bg-surface">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((src, i) => (
                    <div key={src} className="aspect-square rounded-2xl overflow-hidden bg-surface">
                      <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ProductInfo product={product} />
          </div>
        </div>
      </section>
      </div>
      <div className="md:hidden">
        <ProductMobile product={product} />
      </div>

      <div className="max-md:hidden">
        <LogoCloudSection />
      </div>
    </main>
  );
}
