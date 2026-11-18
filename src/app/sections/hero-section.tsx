import NavCartLink from "../components/nav-cart-link";
import LangSwitch from "../components/lang-switch";
import { T } from "../components/i18n";
import MobileMenuController from "../components/mobile-menu-controller";
import SiteLink from "../components/site-link";
import FeatureCard from "../components/feature-card";
import { FeatureCard_cids } from "../_cids";
import { FeatureCard_styles } from "../_styles";
import { featureCardData as featureCardDataContent } from "../content";
import { HeroText, HeroTitle } from "../components/hero-rotator";
/** Hero section — the page's lead block. */
export default function HeroSection({ featureCardData = featureCardDataContent } = {}) {
  return (
    <div className="w-full h-200 block relative shrink-0 overflow-clip max-md:h-203 md:max-lg:h-256 2xl:h-270" data-cid="n4">
      <div className="h-full block absolute top-0 inset-x-0" data-cid="n5">
        <picture className="contents">
          <source media="(max-width: 571.98px)" srcSet="/assets/akal/hero.webp" />
          <img className="w-full h-200 block overflow-clip object-cover aspect-[auto_3344/1882] max-md:h-[812px] md:max-lg:h-256 2xl:h-270" data-cid="n6" data-component="image" alt="AKAL" height="1882" sizes="100vw" src="/assets/akal/hero.webp" width="3344" />
        </picture>
      </div>
      <div data-menu-shell data-open="false" className="h-22 block absolute inset-x-0 z-5 shrink-0 max-lg:h-18 2xl:h-25" data-cid="n16">
        <svg aria-hidden="true" width="0" height="0" className="absolute pointer-events-none">
          <filter id="akal-liquid" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
            <feImage href="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20100%20100'%20preserveAspectRatio%3D'none'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'0'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23800080'%2F%3E%3Cstop%20offset%3D'.28'%20stop-color%3D'%23808080'%2F%3E%3Cstop%20offset%3D'.62'%20stop-color%3D'%23808080'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%2380ff80'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'100'%20height%3D'100'%20fill%3D'url(%23g)'%2F%3E%3C%2Fsvg%3E" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <MobileMenuController />
        <nav className="h-full flex relative px-8 justify-between items-center content-center overflow-clip max-lg:pb-8 max-lg:px-5 max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:gap-7 2xl:px-15 max-md:pt-3" data-cid="n17" data-component="nav">
          <div className="w-[89.3px] h-9 flex relative justify-between items-center content-center shrink-0 max-md:w-full max-lg:h-18 md:max-lg:w-full" data-cid="n18">
            <div className="w-[89.3px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n19">
              <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-3xl font-bold leading-9" data-cid="n20" dir="auto">
                <SiteLink className="inline cursor-pointer hover:border-clr-8 hover:text-clr-8 hover:outline-clr-8 hover:[text-decoration-color:var(--clr-8)] focus:border-background focus:text-background focus:outline-background focus:[text-decoration-color:var(--background)]" data-cid="n21" data-component="link" href="/">
                  <T fr="AKAL" ar="أكال" />
                </SiteLink>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <NavCartLink className="hidden max-lg:flex" />
            <div data-menu-toggle role="button" tabIndex={0} aria-expanded="false" aria-label="Ouvrir le menu" className="hidden max-lg:w-8 max-lg:h-8 max-lg:block max-lg:relative max-lg:shrink-0 max-lg:cursor-pointer" data-cid="n22">
              <div className="hidden max-lg:w-6 max-lg:h-0.5 max-lg:block max-lg:absolute max-lg:top-[0.6875rem] max-lg:left-1 max-lg:rounded-[10px] max-lg:shrink-0 max-lg:bg-background" data-cid="n23" />
              <div className="hidden max-lg:w-6 max-lg:h-0.5 max-lg:block max-lg:absolute max-lg:top-[1.1875rem] max-lg:left-1 max-lg:rounded-[10px] max-lg:shrink-0 max-lg:bg-background" data-cid="n24" />
            </div>
            </div>
          </div>
          <div className="flex relative justify-center items-center content-center shrink-0 gap-[1.5625rem] max-lg:flex-col max-lg:items-start max-lg:content-start max-lg:gap-5" data-cid="n25">
            {featureCardData.map((d, i) => (
              <FeatureCard
                key={i}
                d={d}
                cids={FeatureCard_cids[i % FeatureCard_cids.length]}
                styles={FeatureCard_styles[i % FeatureCard_styles.length]}
              />
            ))}
          </div>
          <div className="w-auto flex items-center gap-3 relative shrink-0" data-cid="n41">
            <LangSwitch />
            <NavCartLink className="flex max-lg:hidden" />
            <SiteLink className="max-lg:hidden w-[10.6875rem] h-[3.9375rem] flex relative py-5.5 px-10 rounded-[99px] justify-center items-center content-center gap-2 overflow-clip text-primary bg-background cursor-pointer after:content-[''] after:block after:absolute after:inset-0 after:w-[10.6875rem] after:h-[3.9375rem] after:rounded-tl-[99px]" data-cid="n42" data-component="link" href={"https://wa.me/message/GMPBRPK6QRRNM1"} target="_blank">
              <div className="w-[5.6875rem] h-[1.1875rem] flex relative flex-col justify-start items-center content-center shrink-0 overflow-clip" data-cid="n43">
                <div className="w-[5.6875rem] flex relative flex-col justify-start items-center content-center shrink-0" data-cid="n44">
                  <div className="w-[5.6875rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n45">
                    <p className="block text-color-001 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n46" dir="auto">
                      <T fr="WhatsApp" ar="واتساب" />
                    </p>
                  </div>
                  <div className="w-[5.6875rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n47">
                    <p className="block text-color-001 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n48" dir="auto">
                      <T fr="WhatsApp" ar="واتساب" />
                    </p>
                  </div>
                </div>
              </div>
            </SiteLink>
          </div>
        </nav>
      </div>
      <div className="h-[23.3125rem] flex absolute bottom-0 inset-x-0 z-1 pb-15 px-8 flex-col justify-start items-start content-start shrink-0 gap-7 max-md:h-auto max-lg:pb-10 max-lg:px-5 max-lg:gap-6 md:max-lg:h-[18.5625rem] 2xl:h-63 2xl:px-15 2xl:justify-between 2xl:items-end 2xl:content-end 2xl:[flex-direction:initial] 2xl:gap-[initial] max-md:top-[11.5rem] max-md:bottom-0 max-md:pb-0 max-md:items-center max-md:content-center" data-cid="n49">
        <div className="w-full flex relative flex-col justify-start items-start content-start shrink-0 gap-9 max-lg:gap-7 2xl:w-2/5 max-md:items-center" data-cid="n50">
          <div className="flex relative flex-col justify-start items-start content-start shrink-0 gap-5 max-md:items-center" data-cid="n51">
            <div className="w-180 max-md:w-full flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:items-center" data-cid="n52">
              <h1 className="block text-color-001 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-7xl font-bold leading-18 tracking-[-2.88px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-5xl max-lg:leading-12 max-lg:tracking-[-1.92px] 2xl:text-8xl 2xl:leading-24 2xl:tracking-[-3.84px] max-md:text-center max-md:text-white" data-cid="n53" data-component="heading" dir="auto">
                <HeroTitle />
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full flex relative flex-col justify-start items-start content-start shrink-0 gap-6 max-lg:gap-5 2xl:w-[29%] max-md:items-center max-md:text-center" data-cid="n55">
          <div className="w-full max-w-130 flex relative flex-col justify-start shrink-0" data-cid="n56">
            <p className="block text-color-001 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-lg leading-[1.6875rem] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] 2xl:text-xl 2xl:leading-7.5 max-md:text-center max-md:text-white max-md:[text-shadow:0_1px_10px_rgba(0,0,0,0.55)] max-md:font-medium" data-cid="n57" dir="auto">
              <HeroText />
            </p>
          </div>
        </div>
          <div className="w-[13.4125rem] block relative shrink-0 max-md:absolute max-md:bottom-14 max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-[16rem] max-md:z-2" data-cid="n58">
            <SiteLink className="hero-cta w-[13.4125rem] max-md:w-[16rem] h-[3.9375rem] flex relative py-5.5 px-10 rounded-[99px] justify-center items-center content-center gap-2 overflow-clip text-primary bg-color-001 cursor-pointer after:content-[''] after:block after:absolute after:inset-0 after:w-[13.4125rem] after:h-[3.9375rem] after:rounded-tl-[99px]" data-cid="n59" data-component="link" href="/produits">
              <div className="w-[8.4125rem] max-md:w-[13rem] h-[1.1875rem] flex relative flex-col justify-start items-center content-center shrink-0 overflow-clip" data-cid="n60">
                <div className="w-[8.4125rem] max-md:w-[13rem] flex relative flex-col justify-start items-center content-center shrink-0" data-cid="n61">
                  <div className="w-[8.4125rem] max-md:w-[13rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n62">
                    <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n63" dir="auto">
                      <T fr={"Nos produits"} ar={"اكتشف منتجاتنا"} />
                    </p>
                  </div>
                  <div className="w-[8.4125rem] max-md:w-[13rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n64">
                    <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n65" dir="auto">
                      <T fr={"Nos produits"} ar={"اكتشف منتجاتنا"} />
                    </p>
                  </div>
                </div>
              </div>
            </SiteLink>
          </div>
      </div>
    </div>
  );
}
