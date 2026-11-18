import { T } from "./i18n";
import SiteLink from "./site-link";
import type { FeatureCardStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type FeatureCardData = {
  href: string;
  title: string;
  titleAr?: string;
  href2: string;
  description: string;
  descriptionAr?: string;
};
/** A feature card. */
export default function FeatureCard({ d, cids, styles }: { d: FeatureCardData; cids: string[]; styles: FeatureCardStyles }) {
  return (
    <div data-cid={cids?.[0]} className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles?.className, "w-auto max-lg:w-auto")}>
      <h4 data-cid={cids[1]} className="hidden max-lg:block max-lg:text-background max-lg:[font-family:Inter,_'Inter_Placeholder',_sans-serif] max-lg:text-xl max-lg:font-semibold max-lg:leading-6.5 max-lg:tracking-[-0.2px] max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
        <SiteLink data-cid={cids[2]} className="hidden max-lg:inline max-lg:cursor-pointer" href={d.href}>
          <T fr={d.title} ar={d.titleAr} />
        </SiteLink>
      </h4>
      <p data-cid={cids[3]} className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-medium leading-[1.1875rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" dir="auto">
        <SiteLink data-cid={cids[4]} className={cn("inline cursor-pointer max-lg:hidden focus:border-background focus:text-background focus:outline-background focus:[text-decoration-color:var(--background)]", styles.className2)} data-component="link" href={d.href2}>
          <T fr={d.description} ar={d.descriptionAr} />
        </SiteLink>
      </p>
    </div>
  );
}
