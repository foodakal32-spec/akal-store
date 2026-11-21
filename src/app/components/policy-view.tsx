"use client";

import SiteLink from "./site-link";
import { useLang } from "./i18n";
import { policies, type Policy } from "../policies";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

/** Body of a store policy page, with links to the other policies. */
export default function PolicyView({ policy }: { policy: Policy }) {
  const { lang } = useLang();
  const text = policy[lang];

  return (
    <div className="grid grid-cols-[16rem_1fr] gap-14 items-start max-lg:grid-cols-1 max-lg:gap-8">
      <nav aria-label={lang === "ar" ? "سياسات المتجر" : "Politiques du magasin"} className="flex flex-col gap-1 lg:sticky lg:top-6 max-lg:flex-row max-lg:flex-wrap max-lg:gap-2">
        {policies.map((p) => {
          const active = p.slug === policy.slug;
          return (
            <SiteLink
              key={p.slug}
              href={`/politiques/${p.slug}`}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-5 py-3 text-base font-semibold transition-colors ${font} ${active ? "bg-[#344E2F] text-white" : "text-color-001 hover:bg-surface max-lg:bg-surface"}`}
            >
              {p[lang].title}
            </SiteLink>
          );
        })}
      </nav>

      <article className="flex flex-col gap-8 max-w-180">
        <header className="flex flex-col gap-4">
          <h1 className={`text-[2.5rem] font-bold leading-[2.75rem] tracking-[-1.56px] text-color-001 max-lg:text-[1.875rem] max-lg:leading-9 ${font}`}>{text.title}</h1>
          <p className={`text-base leading-6 text-muted-foreground ${font}`}>{text.intro}</p>
        </header>
        <div className="flex flex-col divide-y divide-black/10 border-y border-black/10">
          {text.sections.map((s) => (
            <section key={s.title} className="py-6 flex flex-col gap-2">
              <h2 className={`text-xl font-semibold text-color-001 ${font}`}>{s.title}</h2>
              <p className={`text-base leading-[1.75rem] text-muted-foreground ${font}`}>{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
