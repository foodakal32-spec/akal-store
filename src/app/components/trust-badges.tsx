import { T } from "./i18n";
import type { ReactNode } from "react";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const badges: { label: string; labelAr: string; icon: ReactNode }[] = [
  {
    label: "100% naturel", labelAr: "طبيعي 100%",
    icon: (
      <Icon>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </Icon>
    ),
  },
  {
    label: "Fait main", labelAr: "مصنوع يدوياً",
    icon: (
      <Icon>
        <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </Icon>
    ),
  },
  {
    label: "Sans conservateurs", labelAr: "بدون مواد حافظة",
    icon: (
      <Icon>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </Icon>
    ),
  },
  {
    label: "Paiement à la livraison", labelAr: "الدفع عند الاستلام",
    icon: (
      <Icon>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </Icon>
    ),
  },
];

/** Reassurance card shown on product pages. */
export default function TrustBadges() {
  return (
    <ul className="w-full grid grid-cols-4 gap-4 rounded-3xl bg-[#F6F4EF] px-6 py-6 max-md:grid-cols-2 max-md:gap-y-6">
      {badges.map((b) => (
        <li key={b.label} className="flex flex-col items-center gap-3 text-center">
          <span className="w-16 h-16 flex items-center justify-center rounded-full border border-black/15 text-[#1E504D]">{b.icon}</span>
          <span className={`text-base leading-[1.375rem] text-muted-foreground ${font}`}><T fr={b.label} ar={b.labelAr} /></span>
        </li>
      ))}
    </ul>
  );
}
