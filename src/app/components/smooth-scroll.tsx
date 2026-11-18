"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      lerp: 0.18,
      wheelMultiplier: 1.15,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
