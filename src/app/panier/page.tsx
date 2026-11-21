import { T } from "../components/i18n";
import SiteLink from "../components/site-link";
import SiteHeader from "../components/site-header";
import GlassBackground from "../components/glass-background";
import CartView from "../components/cart-view";
import LogoCloudSection from "../sections/logo-cloud-section";

export const metadata = {
  title: "Panier — AKAL أكال",
  description: "Votre panier AKAL : vérifiez vos produits et envoyez votre commande sur WhatsApp.",
};

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

export default function PanierPage() {
  return (
    <main className="w-full min-h-screen relative theme-beige">
      <GlassBackground />
      <section className="w-full relative z-10">
        <SiteHeader plainNav />
      </section>
      <section className="w-full relative z-10 px-10 pt-4 pb-14 max-lg:px-5 max-lg:pt-2 max-lg:pb-10">
        <div className="w-full max-w-337.5 mx-auto">
          <CartView />
        </div>
      </section>
      <div className="relative z-10">
        <LogoCloudSection />
      </div>
    </main>
  );
}
