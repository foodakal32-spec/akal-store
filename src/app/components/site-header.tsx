"use client";

import SearchButton from "./search-button";
import SiteLink from "./site-link";
import { WHATSAPP_URL } from "../product-data";
import { T } from "./i18n";
import LangSwitch from "./lang-switch";
import NavCartLink from "./nav-cart-link";
import MobileMenuController from "./mobile-menu-controller";
import FeatureCard from "./feature-card";
import { FeatureCard_cids } from "../_cids";
import { FeatureCard_styles } from "../_styles";
import { featureCardData } from "../content";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

/**
 * Global Site Header used across all secondary pages:
 * Matches the home page navigation with liquid glass, full menu links, cart, lang switch, and WhatsApp button.
 */
export default function SiteHeader({ plainNav = true }: { plainNav?: boolean } = {}) {
  return (
    <header className="w-full relative z-20">
      <div data-menu-shell data-nav-plain={plainNav ? "true" : undefined} data-open="false" className="h-22 block relative inset-x-0 z-5 shrink-0 max-lg:h-18 2xl:h-25">
        <svg aria-hidden="true" width="0" height="0" className="absolute pointer-events-none">
          <filter id="akal-liquid-header" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
            <feImage href="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20100%20100'%20preserveAspectRatio%3D'none'%3E%3Cdefs%3E%3ClinearGradient%20id%3D'g'%20x1%3D'0'%20y1%3D'0'%20x2%3D'0'%20y2%3D'1'%3E%3Cstop%20offset%3D'0'%20stop-color%3D'%23800080'%2F%3E%3Cstop%20offset%3D'.28'%20stop-color%3D'%23808080'%2F%3E%3Cstop%20offset%3D'.62'%20stop-color%3D'%23808080'%2F%3E%3Cstop%20offset%3D'1'%20stop-color%3D'%2380ff80'%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D'100'%20height%3D'100'%20fill%3D'url(%23g)'%2F%3E%3C%2Fsvg%3E" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <MobileMenuController />
        <nav className="h-full max-w-337.5 mx-auto flex relative px-8 justify-between items-center content-center overflow-clip max-lg:pb-8 max-lg:px-5 max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:gap-7 2xl:px-15 max-md:pt-3" data-component="nav">
          <div dir="ltr" className="w-[89.3px] h-9 flex relative justify-between items-center content-center shrink-0 max-md:w-full max-lg:h-18 md:max-lg:w-full">
<div className="hidden max-lg:flex items-center gap-1"><SearchButton /><NavCartLink className="flex" /></div>
            <div className="w-[89.3px] flex relative max-lg:static flex-col justify-start shrink-0 whitespace-pre text-nowrap">
<SiteLink className="block cursor-pointer max-lg:absolute max-lg:left-1/2 max-lg:top-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2" href="/" aria-label="AKAL"><img src="/assets/logo.png.png" alt="AKAL أكال" width="52" height="52" className="h-13 w-13 rounded-full object-cover shadow-md" /></SiteLink>
            </div>
            <div className="flex items-center gap-2">
              <div data-menu-toggle role="button" tabIndex={0} aria-expanded="false" aria-label="Ouvrir le menu" className="hidden max-lg:w-8 max-lg:h-8 max-lg:block max-lg:relative max-lg:shrink-0 max-lg:cursor-pointer">
                <div className="hidden max-lg:w-6 max-lg:h-0.5 max-lg:block max-lg:absolute max-lg:top-[0.6875rem] max-lg:left-1 max-lg:rounded-[10px] max-lg:shrink-0 max-lg:bg-background" />
                <div className="hidden max-lg:w-6 max-lg:h-0.5 max-lg:block max-lg:absolute max-lg:top-[1.1875rem] max-lg:left-1 max-lg:rounded-[10px] max-lg:shrink-0 max-lg:bg-background" />
              </div>
            </div>
          </div>

          <div className="flex relative justify-center items-center content-center shrink-0 gap-[1.5625rem] max-lg:flex-col max-lg:items-start max-lg:content-start max-lg:gap-5">
            {featureCardData.map((d, i) => (
              <FeatureCard
                key={i}
                d={d}
                cids={FeatureCard_cids[i % FeatureCard_cids.length]}
                styles={FeatureCard_styles[i % FeatureCard_styles.length]}
              />
            ))}
          </div>

          <div className="w-auto flex items-center gap-3 relative shrink-0">
            <LangSwitch />
            <NavCartLink className="flex max-lg:hidden" />
            <SiteLink className="max-lg:hidden w-[10.6875rem] h-[3.9375rem] flex relative py-5.5 px-10 rounded-[99px] justify-center items-center content-center gap-2 overflow-clip text-primary bg-background cursor-pointer hover:bg-white/90 active:scale-95 transition-all" href={WHATSAPP_URL} target="_blank">
              <div className="w-[5.6875rem] h-[1.1875rem] flex relative flex-col justify-start items-center content-center shrink-0 overflow-clip">
                <div className="w-[5.6875rem] flex relative flex-col justify-start items-center content-center shrink-0">
                  <div className="w-[5.6875rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                    <p className={`block text-color-001 ${font} text-base font-semibold leading-[1.1875rem] text-center`} dir="auto">
                      <T fr="WhatsApp" ar="واتساب" />
                    </p>
                  </div>
                </div>
              </div>
            </SiteLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
