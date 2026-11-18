import { T } from "./i18n";
import SiteLink from "./site-link";
import type { Tile5Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Tile5Data = {
  href: string;
  description: string;
  descriptionAr?: string;
};
/** A content tile. */
export default function Tile5({ d, cids, styles }: { d: Tile5Data; cids: string[]; styles: Tile5Styles }) {
  return (
    <div data-cid={cids[0]} className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden", styles.className)}>
      <p data-cid={cids[1]} className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" dir="auto">
        <SiteLink data-cid={cids[2]} className={cn("inline cursor-pointer max-lg:hidden focus:border-clr-11 focus:text-clr-11 focus:outline-clr-11 focus:[text-decoration-color:var(--clr-11)]", styles.className2)} data-component="link" href={d.href}>
          <T fr={d.description} ar={d.descriptionAr} />
        </SiteLink>
      </p>
    </div>
  );
}
