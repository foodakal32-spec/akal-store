import "./globals.css";
import "./ditto.css";
import type { ReactNode } from "react";
import { PageTransition } from "@/components/animate-ui/components/page-transition";
import { LangDir, LangProvider } from "./components/i18n";
import { CartProvider } from "./components/cart-provider";
import ComingSoon from "./components/coming-soon";
import SmoothScroll from "./components/smooth-scroll";
import { SITE_ORIGIN } from "../lib/site";

export const metadata = {
  "metadataBase": new URL(SITE_ORIGIN || "http://localhost:3000"),
  "title": "AKAL أكال ⴰⴽⴰⵍ — Produits naturels faits maison",
  "description": "Produits naturels faits maison, 100% à la main, sans conservateurs, pour une vie plus saine.",
  "robots": "max-image-preview:large",
  "alternates": {
    "canonical": "/"
  },
  "openGraph": {
    "title": "AKAL أكال ⴰⴽⴰⵍ — Produits naturels faits maison",
    "description": "Produits naturels faits maison, 100% à la main, sans conservateurs, pour une vie plus saine.",
    "type": "website",
    "url": "/",
    "images": [
      "/assets/akal/logo.svg"
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "AKAL أكال ⴰⴽⴰⵍ — Produits naturels faits maison",
    "description": "Produits naturels faits maison, 100% à la main, sans conservateurs, pour une vie plus saine.",
    "images": [
      "/assets/akal/logo.svg"
    ]
  },
  "icons": {
    "icon": [
      {
        "url": "/assets/cloned/images/687c490c8973.png",
        "media": "(prefers-color-scheme: light)"
      },
      {
        "url": "/assets/cloned/images/687c490c8973.png",
        "media": "(prefers-color-scheme: dark)"
      }
    ],
    "apple": [
      {
        "url": "/assets/cloned/images/687c490c8973.png"
      }
    ]
  }
};
export const viewport = {
  "width": "device-width",
  "initialScale": 1
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={"fr"} suppressHydrationWarning>
      <body className="block text-foreground [font-family:sans-serif] text-xs font-normal not-italic leading-3.5 tracking-[normal] [word-spacing:0px] text-start normal-case whitespace-normal [word-break:normal] [overflow-wrap:normal] indent-0 [text-shadow:none] [font-variant-caps:normal] [font-feature-settings:normal] list-outside [writing-mode:horizontal-tb] bg-background" data-cid="n0">
        <LangProvider>
        <CartProvider>
          <SmoothScroll />
          <ComingSoon />
          <PageTransition effect="bands">
            <LangDir>{children}</LangDir>
          </PageTransition>
        </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
