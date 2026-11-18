"use client";

import { usePathname } from "next/navigation";
import GlassBackground from "./glass-background";

/** Desktop-only (lg and up) full-screen "coming soon" cover. Phones/tablets keep the normal store; /admin is exempt. */
export default function ComingSoon() {
  const path = usePathname();
  if (path?.startsWith("/admin")) return null;
  return (
    <div className="fixed inset-0 z-[99999] hidden overflow-hidden bg-[#0E2A3A] lg:block">
      <GlassBackground />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <div className="rounded-[36px] border border-white/30 bg-white/10 px-16 py-14 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d8ff7c]">AKAL · أكال</p>
          <h1 dir="rtl" className="mt-5 text-6xl font-extrabold leading-tight 2xl:text-7xl">قريباً جداً</h1>
          <p dir="rtl" className="mx-auto mt-4 max-w-2xl text-xl leading-9 text-white/90">نسخة الحاسوب قيد التطوير حالياً، والمتجر متاح الآن على الهاتف فقط. افتح هذا الموقع من هاتفك للتسوّق.</p>
          <div className="mx-auto my-7 h-px w-40 bg-white/30" />
          <p className="text-3xl font-bold">Bientôt disponible</p>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-7 text-white/85">La version ordinateur est en cours de développement. La boutique est disponible uniquement sur mobile : ouvrez ce site depuis votre téléphone pour commander.</p>
          <p className="mt-6 text-base font-semibold tracking-[0.4em] text-white/70">COMING SOON</p>
        </div>
      </div>
    </div>
  );
}
