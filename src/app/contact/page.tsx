import type { ReactNode } from "react";
import { T } from "../components/i18n";
import SiteHeader from "../components/site-header";
import LogoCloudSection from "../sections/logo-cloud-section";
import { WHATSAPP_URL } from "../product-data";

export const metadata = {
  title: "اتصل بنا — AKAL أكال",
  description: "تواصل مع فريق أكال (AKAL) للاستفسار أو الطلب المباشر لمنتجاتنا الطبيعية.",
};

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";
const card = "rounded-2xl bg-white p-6 shadow-[0_2px_14px_rgba(43,43,43,0.08)] max-md:p-5";

const svg = { viewBox: "0 0 24 24", width: 22, height: 22, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

/** One row of the contact list: tinted round icon, label, value (and an optional link). */
function Row({ icon, tint, label, children }: { icon: ReactNode; tint: string; label: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${tint}`}>{icon}</span>
      <div className={`min-w-0 flex flex-col gap-1 text-start ${font}`}>
        <span className="text-base font-medium text-[#2B2B2B]">{label}</span>
        <div className="text-[0.95rem] leading-6 text-[#5F5F5F]">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen relative theme-beige">
      <section className="w-full relative z-10">
        <SiteHeader plainNav />

        <div className="w-full max-w-xl mx-auto px-5 pt-10 pb-4 text-center">
          <h1 className={`text-[1.875rem] font-bold leading-9 tracking-[-1px] text-[#2B2B2B] ${font}`}>
            <T fr="Contactez-nous" ar="تواصل معنا" />
          </h1>
          <p className={`mt-3 text-base leading-relaxed text-[#5F5F5F] ${font}`}>
            <T
              fr="Notre équipe vous répond avec plaisir."
              ar="فريقنا في خدمتكم دائماً."
            />
          </p>
        </div>

        <div className="w-full max-w-xl mx-auto px-5 pt-4 pb-14 flex flex-col gap-5">
          {/* Contact information */}
          <section className={card}>
            <h2 className={`mb-6 text-xl font-bold text-[#2B2B2B] text-start ${font}`}>
              <T fr="Informations de contact" ar="معلومات الاتصال" />
            </h2>
            <ul className="flex flex-col gap-6">
              <Row
                tint="bg-[#E4EDE0] text-[#344E2F]"
                label={<T fr="WhatsApp" ar="واتساب" />}
                icon={<svg {...svg}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>}
              >
                <p>
                  <T fr="Réponse rapide à vos questions et suivi de commande." ar="رد سريع على أسئلتكم ومتابعة طلباتكم." />
                </p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#344E2F] hover:underline">
                  <T fr="Discuter sur WhatsApp" ar="محادثة عبر واتساب" />
                </a>
              </Row>

              <Row
                tint="bg-[#F6E6DA] text-[#B5703C]"
                label={<T fr="E-mail" ar="البريد الإلكتروني" />}
                icon={<svg {...svg}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>}
              >
                <a href="mailto:contact@akal.ma" dir="ltr" className="inline-block hover:underline">contact@akal.ma</a>
              </Row>

              <Row
                tint="bg-[#F3EAD3] text-[#9C7F3C]"
                label={<T fr="Instagram" ar="إنستغرام" />}
                icon={<svg {...svg}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>}
              >
                <a href="https://www.instagram.com/akal.fr" target="_blank" rel="noopener noreferrer" dir="ltr" className="inline-block hover:underline">@akal.fr</a>
              </Row>
            </ul>
          </section>

          {/* Delivery & payment */}
          <section className={card}>
            <h2 className={`mb-5 flex items-center gap-2.5 text-xl font-bold text-[#2B2B2B] text-start ${font}`}>
              <svg {...svg} className="shrink-0 text-[#344E2F]"><path d="M1 6h13v10H1z" /><path d="M14 9h4l3 3v4h-7z" /><circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
              <T fr="Livraison et paiement" ar="التوصيل والدفع" />
            </h2>
            <p className={`text-[0.95rem] leading-6 text-[#2B2B2B] text-start ${font}`}>
              <T fr="Livraison partout au Maroc, paiement à la livraison." ar="توصيل إلى جميع مدن المغرب، والدفع عند الاستلام." />
            </p>
          </section>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10">
        <LogoCloudSection />
      </div>
    </main>
  );
}
