import { T } from "../components/i18n";
import SiteHeader from "../components/site-header";
import GlassBackground from "../components/glass-background";
import LogoCloudSection from "../sections/logo-cloud-section";
import OfferButton from "../components/offer-button";

export const metadata = {
  title: "قصتنا — AKAL أكال",
  description: "تعرف على قصة علامة أكال (AKAL) المغربية للمنتجات الطبيعية 100% المصنوعة يدوياً وبدون مواد حافظة.",
};

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

export default function HistoirePage() {
  return (
    <main className="w-full min-h-screen relative bg-[#0e2a3a]">
      <GlassBackground />
      {/* Top Hero Banner */}
      <section className="w-full relative z-10 pb-20 max-lg:pb-14">
        <SiteHeader plainNav />

        <div className="w-full max-w-337.5 mx-auto px-10 pt-16 pb-10 max-lg:px-5 max-lg:pt-10 max-lg:pb-6 text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-semibold tracking-wider uppercase mb-5 backdrop-blur-sm">
            <T fr="Notre Histoire" ar="حكايتنا وأصلنا" />
          </span>
          <h1 className={`text-[3rem] font-bold leading-[3.4rem] tracking-[-1.5px] text-white max-lg:text-[2.2rem] max-lg:leading-10 max-w-220 ${font}`}>
            <T
              fr="AKAL — L'amour de la terre marocaine et du fait-main"
              ar="أكال — حكاية شغف بخيرات الأرض المغربية والصناعة اليدوية"
            />
          </h1>
          <p className={`mt-6 max-w-180 text-lg leading-relaxed text-white/80 max-lg:text-base ${font}`}>
            <T
              fr="« AKAL » signifie « la terre » en langue amazighe. Une terre généreuse d'où naissent nos produits naturels d'exception, conçus avec patience et sans aucun compromis."
              ar="«أكال» تعني «الأرض» باللغة الأمازيغية العريقة. ومن خيرات هذه الأرض الخصبة تبدأ حكايتنا في إحياء المنتجات الطبيعية الأصيلة المصنوعة يدوياً بكل صبر وعناية."
            />
          </p>
        </div>
      </section>

      {/* Narrative Story Sections */}
      <section className="w-full relative z-10 max-w-337.5 mx-auto px-10 py-20 max-lg:px-5 max-lg:py-12 flex flex-col gap-16 [text-shadow:0_2px_14px_rgba(0,0,0,0.45)]">
        {/* Story Part 1: How it started */}
        <div className="grid grid-cols-2 gap-12 items-center max-lg:grid-cols-1 max-lg:gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-[#d8ff7c] text-base font-bold tracking-widest uppercase">
              <T fr="01. Les Origines" ar="01. البداية والنشأة" />
            </span>
            <h2 className={`text-4xl font-bold text-white leading-snug max-lg:text-[1.9rem] ${font}`}>
              <T
                fr="De la cuisine familiale à votre quotidien"
                ar="من دفء البيت التقليدي إلى مائدتكم اليومية"
              />
            </h2>
            <div className={`flex flex-col gap-4 text-xl leading-9 text-white/90 max-lg:text-lg max-lg:leading-8 ${font}`}>
              <p>
                <T
                  fr="AKAL est née de la nostalgie des saveurs d'antan : des produits simples et purs, préparés à la main comme le faisaient nos grands-mères, à partir des meilleurs terroirs du Maroc."
                  ar="وُلدت «أكال» من الحنين إلى نكهات زمان: منتجات بسيطة ونقية، نصنعها يدوياً كما كانت تفعل جداتنا، من أجود خيرات الأرض المغربية."
                />
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-[#EAF2ED] flex items-center justify-center p-8">
            <img
              src="/assets/akal/story.svg"
              alt="AKAL Story"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Story Part 2: The Philosophy */}
        <div className="grid grid-cols-2 gap-12 items-center max-lg:grid-cols-1 max-lg:gap-8">
          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-[#F7F5F0] flex items-center justify-center p-8 max-lg:order-2">
            <img
              src="/assets/akal/date-sugar-1.svg"
              alt="Ingrédients AKAL"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-6 max-lg:order-1">
            <span className="text-[#d8ff7c] text-base font-bold tracking-widest uppercase">
              <T fr="02. La Philosophie" ar="02. فلسفتنا في العمل" />
            </span>
            <h2 className={`text-4xl font-bold text-white leading-snug max-lg:text-[1.9rem] ${font}`}>
              <T
                fr="Prendre le temps de bien faire les choses"
                ar="التأني والإتقان: الحِرفة التي لا تعرف التسرع"
              />
            </h2>
            <div className={`flex flex-col gap-4 text-xl leading-9 text-white/90 max-lg:text-lg max-lg:leading-8 ${font}`}>
              <p>
                <T
                  fr="Chaque produit est fait à la main, en petites quantités, sans sucre raffiné, sans conservateurs et sans colorants. Rien que la nature."
                  ar="كل منتج نصنعه يدوياً وبكميات صغيرة، بدون سكر مكرر ولا مواد حافظة ولا ملونات. فقط الطبيعة كما هي."
                />
              </p>
            </div>
          </div>
        </div>

        {/* 3 Key Pillars Banner */}
        <div className="rounded-3xl bg-[#0E2A3A] text-white p-12 max-lg:p-7 flex flex-col gap-10 items-center text-center">
          <div className="flex flex-col gap-3 max-w-160">
            <h3 className={`text-3xl font-bold text-white max-lg:text-2xl ${font}`}>
              <T fr="La promesse AKAL en trois chiffres" ar="وعد علامة أكال في 3 ركائز أساسية" />
            </h3>
            <p className="text-white/75 text-base">
              <T
                fr="Ce qui rend nos produits véritablement uniques au Maroc."
                ar="ما يجعل منتجاتنا فريدة وموثوقة على مستوى المغرب."
              />
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-lg:grid-cols-1 max-lg:gap-5">
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-4xl font-extrabold text-[#d8ff7c]">100%</span>
              <strong className="text-lg text-white font-bold">
                <T fr="Fait à la main" ar="صناعة يدوية 100%" />
              </strong>
              <p className="text-sm text-white/70">
                <T
                  fr="Préparé avec soin selon les recettes marocaines traditionnelles."
                  ar="محضر بعناية تامة وفق الوصفات المغربية الأصيلة المتوارثة."
                />
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-4xl font-extrabold text-[#d8ff7c]">0</span>
              <strong className="text-lg text-white font-bold">
                <T fr="Conservateur chimique" ar="خالٍ من المواد الحافظة" />
              </strong>
              <p className="text-sm text-white/70">
                <T
                  fr="Aucun additif, colorant artificiel ou exhausteur de goût."
                  ar="خالٍ تماماً من أي مضافات كيميائية أو ملونات أو نكهات اصطناعية."
                />
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-4xl font-extrabold text-[#d8ff7c]">100%</span>
              <strong className="text-lg text-white font-bold">
                <T fr="Terroir marocain" ar="طبيعي ومن الأرض المغربية" />
              </strong>
              <p className="text-sm text-white/70">
                <T
                  fr="Ingrédients rigoureusement sélectionnés auprès de producteurs locaux."
                  ar="مكونات منتقاة بعناية فائقة من الواحات والتعاونيات الفلاحية المغربية."
                />
              </p>
            </div>
          </div>

          {/* CTA to Products */}
          <div className="pt-4">
            <OfferButton
              variant="block"
              href="/produits"
              label={
                <span className="flex items-center justify-center gap-3 px-6">
                  <span>🛍️</span>
                  <span><T fr="Découvrir tous nos produits" ar="اكتشف جميع منتجاتنا الآن" /></span>
                </span>
              }
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10">
        <LogoCloudSection />
      </div>
    </main>
  );
}
