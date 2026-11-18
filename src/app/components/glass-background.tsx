"use client";

export default function GlassBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="/assets/product-background.png"
        alt="AKAL Background"
        className="w-full h-full object-cover object-center scale-105 blur-[28px] saturate-[1.8]"
      />
      <div className="absolute inset-0 bg-[#0e2a3a]/30 [box-shadow:inset_0_0_120px_rgba(0,0,0,0.3)]" />
    </div>
  );
}
