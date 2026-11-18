import SiteHeader from "../components/site-header";
import GlassBackground from "../components/glass-background";
import CheckoutView from "../components/checkout-view";
import LogoCloudSection from "../sections/logo-cloud-section";
import { T } from "../components/i18n";

export const metadata = {
  title: "Commande — AKAL أكال",
  description: "Finalisez votre commande AKAL : livraison partout au Maroc, paiement à la livraison.",
};

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

export default function CommandePage() {
  return (
    <main className="w-full min-h-screen relative bg-[#0e2a3a]">
      <GlassBackground />
      <section className="w-full relative z-10">
        <SiteHeader plainNav />
      </section>
      <section className="w-full relative z-10 px-10 py-14 max-lg:px-5 max-lg:py-10">
        <div className="w-full max-w-337.5 mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className={`text-[3.25rem] font-bold leading-[3.4375rem] tracking-[-1.56px] text-white drop-shadow-md max-lg:text-[2.5rem] max-lg:leading-10.5 ${font}`}><T fr="Finaliser la commande" ar="إتمام الطلب" /></h1>
            <p className={`text-lg text-white/80 ${font}`}><T fr="Sans création de compte — paiement à la livraison" ar="بدون تسجيل حساب — الدفع عند الاستلام" /></p>
          </div>
          <CheckoutView />
        </div>
      </section>
      <div className="relative z-10">
        <LogoCloudSection />
      </div>
    </main>
  );
}
