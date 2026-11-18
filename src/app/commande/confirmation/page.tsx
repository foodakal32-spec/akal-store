import { Suspense } from "react";
import SiteHeader from "../../components/site-header";
import OrderConfirmation from "../../components/order-confirmation";
import LogoCloudSection from "../../sections/logo-cloud-section";

export const metadata = {
  title: "Commande enregistrée — AKAL أكال",
  robots: { index: false },
};

export default function ConfirmationPage() {
  return (
    <main className="w-full min-h-screen bg-background">
      <section className="w-full bg-[#1E504D]">
        <SiteHeader plainNav />
      </section>
      <section className="w-full bg-[#F6F5F1] px-10 py-14 max-lg:px-5 max-lg:py-10">
        <Suspense fallback={null}>
          <OrderConfirmation />
        </Suspense>
      </section>
      <LogoCloudSection />
    </main>
  );
}
