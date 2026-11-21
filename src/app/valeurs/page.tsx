import { T } from "../components/i18n";
import SiteHeader from "../components/site-header";
import GlassBackground from "../components/glass-background";
import LogoCloudSection from "../sections/logo-cloud-section";
import OfferButton from "../components/offer-button";

export const metadata = {
  title: "قيمنا — AKAL أكال",
  description: "اكتشف قيم ومبادئ علامة أكال (AKAL) المغربية: النقاء الطبيعي 100%، الحِرفة اليدوية، والالتزام بالأمانة والجودة.",
};

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

export default function ValeursPage() {
  return (
    <main className="w-full min-h-screen relative theme-beige">
      <GlassBackground />
      {/* Top Hero Banner */}
      <section className="w-full relative z-10 pb-20 max-lg:pb-14">
        <SiteHeader plainNav />

        <div className="w-full max-w-337.5 mx-auto px-10 pt-16 pb-10 max-lg:px-5 max-lg:pt-10 max-lg:pb-6 text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-semibold tracking-wider uppercase mb-5 backdrop-blur-sm">
            <T fr="Nos Valeurs" ar="قيمنا ومبادئنا" />
          </span>
          <h1 className={`text-[2.25rem] font-bold leading-[2.6rem] tracking-[-1.2px] text-white max-lg:text-[1.625rem] max-lg:leading-8 max-w-220 ${font}`}>
            <T
              fr="Ce qui nous guide : l'exigence du vrai et de l'authentique"
              ar="ما يوجهنا يومياً: الإصرار على النقاء والأصالة الحقيقية"
            />
          </h1>
          <p className={`mt-4 max-w-180 text-base leading-6 text-white/80 max-lg:text-base ${font}`}>
            <T
              fr="Une vie saine commence par des produits vrais."
              ar="الحياة الصحية تبدأ من منتجات نقية وأصيلة."
            />
          </p>
        </div>
      </section>

      {/* The 4 Core Pillars Grid */}
      <section className="w-full relative z-10 max-w-337.5 mx-auto px-10 py-20 max-lg:px-5 max-lg:py-12 flex flex-col gap-16">
        <div className="text-center max-w-160 mx-auto flex flex-col gap-3">
          <span className="text-[#1E504D] text-sm font-bold tracking-widest uppercase">
            <T fr="Les 4 Piliers" ar="الركائز الأربع" />
          </span>
          <h2 className={`text-3xl font-bold text-color-001 max-lg:text-2xl ${font}`}>
            <T
              fr="Les engagements qui forgent notre réputation"
              ar="الالتزامات التي نبني عليها ثقة عملائنا"
            />
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1 max-lg:gap-6">
          {/* Pillar 1 */}
          <div className="rounded-3xl border border-black/[0.06] bg-white p-8 max-lg:p-6 card-depth flex flex-col gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#E6F2EA] text-[#1E504D] flex items-center justify-center text-2xl font-bold">
              🌿
            </div>
            <h3 className={`text-2xl font-bold text-color-001 ${font}`}>
              <T fr="1. 100% Naturel & Pur" ar="1. طبيعي 100% ونقي" />
            </h3>
            <p className={`text-base leading-relaxed text-muted-foreground ${font}`}>
              <T
                fr="Aucun compromis sur la composition. Nos produits ne contiennent ni conservateurs chimiques, ni colorants, ni arômes artificiels. Chaque ingrédient est sélectionné à sa source pour garantir une pureté absolue."
                ar="لا نساوم أبداً على النقاء والجودة: منتجاتنا خالية تماماً من أي مواد حافظة أو ملونات أو نكهات مصنعة. نختار كل مكون من مصدره الطبيعي الأصلي لضمان نقاء لا تشوبه شائبة."
              />
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-3xl border border-black/[0.06] bg-white p-8 max-lg:p-6 card-depth flex flex-col gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#E6F2EA] text-[#1E504D] flex items-center justify-center text-2xl font-bold">
              ✋
            </div>
            <h3 className={`text-2xl font-bold text-color-001 ${font}`}>
              <T fr="2. Fait main avec passion" ar="2. صناعة يدوية بشغف وإتقان" />
            </h3>
            <p className={`text-base leading-relaxed text-muted-foreground ${font}`}>
              <T
                fr="Chaque pot, chaque flacon est confectionné artisanalement en petites séries. Ce savoir-faire manuel préserve les propriétés bienfaisantes des plantes et des fruits, tout en perpétuant le patrimoine marocain."
                ar="كل علبة وقنينة تُحضر يدوياً وبدفعات صغيرة متقنة. هذه الصنعة اليدوية المتأنية تحافظ على الخصائص الغذائية والعلاجية الغنية للنباتات والفواكه، وتُحيي التراث المغربي الأصيل."
              />
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-3xl border border-black/[0.06] bg-white p-8 max-lg:p-6 card-depth flex flex-col gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#E6F2EA] text-[#1E504D] flex items-center justify-center text-2xl font-bold">
              🌍
            </div>
            <h3 className={`text-2xl font-bold text-color-001 ${font}`}>
              <T fr="3. Respect de la Terre & Terroir" ar="3. احترام الأرض والإنتاج المحلي" />
            </h3>
            <p className={`text-base leading-relaxed text-muted-foreground ${font}`}>
              <T
                fr="Notre nom « AKAL » nous rappelle chaque jour notre dette envers la Terre. Nous soutenons les coopératives et les agriculteurs locaux à travers le Royaume et privilégions des démarches éco-responsables."
                ar="اسمنا «أكال» يذكرنا كل يوم بواجبنا تجاه الأرض. ندعم التعاونيات النسائية وصغار الفلاحين في واحات وقرى المغرب، ونلتزم بممارسات صديقة للبيئة في الإنتاج والتغليف."
              />
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-3xl border border-black/[0.06] bg-white p-8 max-lg:p-6 card-depth flex flex-col gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#E6F2EA] text-[#1E504D] flex items-center justify-center text-2xl font-bold">
              🤝
            </div>
            <h3 className={`text-2xl font-bold text-color-001 ${font}`}>
              <T fr="4. Confiance & Transparence" ar="4. الأمانة وراحة بال العميل" />
            </h3>
            <p className={`text-base leading-relaxed text-muted-foreground ${font}`}>
              <T
                fr="Votre satisfaction est notre priorité absolue. Nous proposons le paiement à la livraison après vérification de votre commande et restons à votre entière disposition pour tout conseil d'utilisation."
                ar="رضاك واطمئنانك هما أولويتنا الأولى دائماً؛ لذلك نعتمد الدفع نقداً عند الاستلام بعد معاينة الطرد، مع تقديم خدمة دعم وتواصل مستمر للإجابة على جميع استفساراتكم بكل رحابة صدر."
              />
            </p>
          </div>
        </div>

        {/* Customer Reassurance Strip */}
        <div className="rounded-3xl bg-[#F6F4EF] p-10 max-lg:p-6 border border-black/[0.04] flex flex-col gap-8 items-center text-center">
          <div className="flex flex-col gap-2 max-w-140">
            <h3 className={`text-2xl font-bold text-color-001 ${font}`}>
              <T fr="L'expérience client AKAL" ar="تجربة تسوق آمنة ومريحة مع أكال" />
            </h3>
            <p className="text-muted-foreground text-sm">
              <T
                fr="Des garanties concrètes pour commander en toute tranquillité."
                ar="ضمانات حقيقية لتطلب وأنت مرتاح البال من أي مدينة في المغرب."
              />
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-lg:grid-cols-1 max-lg:gap-4">
            <div className="p-5 rounded-2xl bg-white shadow-xs flex flex-col items-center gap-2 text-center">
              <span className="text-2xl">🚚</span>
              <strong className="text-base text-color-001 font-bold">
                <T fr="Livraison partout au Maroc" ar="توصيل سريع لجميع المدن" />
              </strong>
              <p className="text-xs text-muted-foreground">
                <T fr="Expédition soignée directement à votre adresse." ar="شحن سريع وآمن حتى باب منزلك أو عملك." />
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white shadow-xs flex flex-col items-center gap-2 text-center">
              <span className="text-2xl">💵</span>
              <strong className="text-base text-color-001 font-bold">
                <T fr="Paiement à la livraison" ar="الدفع نقداً عند الاستلام" />
              </strong>
              <p className="text-xs text-muted-foreground">
                <T fr="Ne payez qu'après avoir reçu et examiné votre colis." ar="عاين وافحص طلبك بكل راحة قبل دفع أي درهم." />
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white shadow-xs flex flex-col items-center gap-2 text-center">
              <span className="text-2xl">🌿</span>
              <strong className="text-base text-color-001 font-bold">
                <T fr="Qualité 100% garantie" ar="ضمان الجودة والنقاء 100%" />
              </strong>
              <p className="text-xs text-muted-foreground">
                <T fr="Produits frais, authentiques et certifiés faits main." ar="منتجات طازجة ومصنوعة يدوياً بحرفية عالية." />
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <OfferButton
              variant="block"
              href="/produits"
              label={
                <span className="flex items-center justify-center gap-3 px-6">
                  <span>🛍️</span>
                  <span><T fr="Découvrir notre collection" ar="تصفح منتجاتنا الطبيعية الآن" /></span>
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
