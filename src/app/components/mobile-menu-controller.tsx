"use client";

import { useEffect } from "react";

/**
 * Makes the cloned hero navigation's hamburger work on phones and tablets.
 * The toggle is the element marked [data-menu-toggle]; it opens/closes the
 * closest [data-menu-shell] by setting data-open, which globals.css animates.
 */
export default function MobileMenuController() {
  useEffect(() => {
    const shellOf = (el: Element | null) => el?.closest("[data-menu-shell]") as HTMLElement | null;

    const setOpen = (shell: HTMLElement, open: boolean) => {
      shell.dataset.open = open ? "true" : "false";
      const toggle = shell.querySelector<HTMLElement>("[data-menu-toggle]");
      if (toggle) {
        toggle.setAttribute("aria-expanded", String(open));
        const ar = document.documentElement.lang === "ar";
        toggle.setAttribute("aria-label", open ? (ar ? "إغلاق القائمة" : "Fermer le menu") : ar ? "فتح القائمة" : "Ouvrir le menu");
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const toggle = target?.closest("[data-menu-toggle]");
      if (toggle) {
        const shell = shellOf(toggle);
        if (shell) setOpen(shell, shell.dataset.open !== "true");
        return;
      }
      // Close after choosing a link in the open menu.
      const link = target?.closest("[data-menu-shell] a");
      const shell = shellOf(link ?? null);
      if (link && shell?.dataset.open === "true") setOpen(shell, false);
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as Element | null;
      if ((e.key === "Enter" || e.key === " ") && target?.closest("[data-menu-toggle]")) {
        e.preventDefault();
        const shell = shellOf(target);
        if (shell) setOpen(shell, shell.dataset.open !== "true");
      }
      if (e.key === "Escape") {
        document.querySelectorAll<HTMLElement>('[data-menu-shell][data-open="true"]').forEach((s) => setOpen(s, false));
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
