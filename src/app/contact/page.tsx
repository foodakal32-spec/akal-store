import { T } from "../components/i18n";
import SiteHeader from "../components/site-header";
import GlassBackground from "../components/glass-background";
import LogoCloudSection from "../sections/logo-cloud-section";
import OfferButton from "../components/offer-button";
import { WHATSAPP_URL } from "../product-data";
import { WhatsAppIcon, GmailIcon, InstagramIcon } from "../components/brand-icons";

export const metadata = {
  title: "اتصل بنا — AKAL أكال",
  description: "تواصل مع فريق أكال (AKAL) للاستفسار أو الطلب المباشر لمنتجاتنا الطبيعية.",
};

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen relative bg-[#0e2a3a] text-white selection:bg-[#20516f] selection:text-white">
      <GlassBackground />
      {/* Top Hero Banner */}
      <section className="w-full relative z-10 pb-12 max-lg:pb-8">
        <SiteHeader plainNav />

        <div className="w-full max-w-337.5 mx-auto px-10 pt-16 pb-8 max-lg:px-5 max-lg:pt-10 max-lg:pb-4 text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/95 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md border border-white/15">
            <T fr="Contactez-nous" ar="تواصل معنا" />
          </span>
          <h1 className={`text-[3.25rem] font-bold leading-[3.6rem] tracking-[-1.5px] text-white max-lg:text-[2.2rem] max-lg:leading-10 max-w-220 ${font}`}>
            <T
              fr="Nous sommes à votre écoute avec plaisir"
              ar="نحن في خدمتكم دائماً ويسعدنا تواصلكم"
            />
          </h1>
          <p className={`mt-5 max-w-180 text-lg leading-relaxed text-white/80 max-lg:text-base ${font}`}>
            <T
              fr="Une question sur nos produits, votre commande ou la livraison ? Notre équipe est disponible pour vous accompagner."
              ar="هل لديك استفسار عن منتجاتنا الطبيعية أو ترغب في متابعة طلبك؟ فريقنا رهن إشارتكم لتقديم كل المساعدة والمعلومات."
            />
          </p>
        </div>
      </section>

      {/* Contact Cards & Channels */}
      <section className="w-full relative z-10 max-w-337.5 mx-auto px-10 py-12 max-lg:px-5 max-lg:py-8 flex flex-col gap-12">
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1 max-lg:gap-5">
          {/* Card 1: WhatsApp */}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#153e56] to-[#0e2a3a] p-8 max-lg:p-6 flex flex-col items-center text-center gap-5 shadow-2xl transition-all duration-300 hover:border-white/30 hover:translate-y-[-2px]">
            <span className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center p-3 shadow-inner">
              <WhatsAppIcon className="w-9 h-9" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className={`text-2xl font-bold text-white ${font}`}>
                <T fr="WhatsApp Direct" ar="واتساب مباشر" />
              </h3>
              <p className="text-sm text-white/75 leading-relaxed min-h-[44px]">
                <T
                  fr="Réponse rapide à toutes vos questions et suivi de commande instantané."
                  ar="تواصل فوري وسريع للإجابة عن أسئلتكم ومتابعة طلباتكم بكل سهولة."
                />
              </p>
            </div>
            <div className="pt-2 w-full mt-auto">
              <OfferButton
                variant="block"
                href={WHATSAPP_URL}
                target="_blank"
                label={<T fr="Discuter sur WhatsApp" ar="محادثة عبر واتساب" />}
              />
            </div>
          </div>

          {/* Card 2: Email Contact */}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#153e56] to-[#0e2a3a] p-8 max-lg:p-6 flex flex-col items-center text-center gap-5 shadow-2xl transition-all duration-300 hover:border-white/30 hover:translate-y-[-2px]">
            <span className="w-16 h-16 rounded-2xl bg-white border border-white/20 flex items-center justify-center p-3 shadow-md">
              <GmailIcon className="w-9 h-9" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className={`text-2xl font-bold text-white ${font}`}>
                <T fr="E-mail (Gmail)" ar="البريد الإلكتروني" />
              </h3>
              <p className="text-sm text-white/75 leading-relaxed min-h-[44px]">
                <T
                  fr="Écrivez-nous à tout moment, notre équipe vous répondra dans les plus brefs délais."
                  ar="راسلنا في أي وقت عبر البريد الإلكتروني وسيجيبك فريقنا في أقرب وقت ممكن."
                />
              </p>
            </div>
            <a
              href="mailto:contact@akal.ma"
              className="mt-auto w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-white text-[#0e2a3a] text-base font-bold hover:bg-white/90 active:scale-95 transition-all shadow-lg"
            >
              <GmailIcon className="w-5 h-5" />
              <span>contact@akal.ma</span>
            </a>
          </div>

          {/* Card 3: Social & Instagram */}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#153e56] to-[#0e2a3a] p-8 max-lg:p-6 flex flex-col items-center text-center gap-5 shadow-2xl transition-all duration-300 hover:border-white/30 hover:translate-y-[-2px]">
            <span className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center p-3 shadow-inner">
              <InstagramIcon className="w-8 h-8" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className={`text-2xl font-bold text-white ${font}`}>
                <T fr="Réseaux sociaux" ar="تابعونا على إنستغرام" />
              </h3>
              <p className="text-sm text-white/75 leading-relaxed min-h-[44px]">
                <T
                  fr="Découvrez nos coulisses de fabrication et nos conseils bien-être au quotidien."
                  ar="اكتشفوا كواليس تحضير المنتجات المنزلية يدوياً ونصائح الصحة الطبيعية اليومية."
                />
              </p>
            </div>
            <a
              href="https://www.instagram.com/akal.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 active:scale-95 text-white text-base font-bold transition-all shadow-lg"
            >
              <InstagramIcon className="w-5 h-5 rounded-sm" />
              <span>@akal.fr</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10">
        <LogoCloudSection bgClassName="bg-[#0e2a3a] border-t border-white/10" />
      </div>
    </main>
  );
}
