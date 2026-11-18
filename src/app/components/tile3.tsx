import { T } from "./i18n";
import SiteLink from "./site-link";
import type { Tile3Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Tile3Data = {
  href: string;
  description: string;
  descriptionAr?: string;
};
/** A content tile. */
export default function Tile3({ d, cids, styles }: { d: Tile3Data; cids: string[]; styles: Tile3Styles }) {
  return (
    <div data-cid={cids[0]} className={cn("hidden max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre max-lg:text-nowrap", styles.className)}>
      <p data-cid={cids[1]} className="hidden max-lg:block max-lg:text-white max-lg:[font-family:Inter,_'Inter_Placeholder',_sans-serif] max-lg:text-base max-lg:leading-[1.625rem] max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
        <SiteLink data-cid={cids[2]} className="hidden max-lg:inline max-lg:cursor-pointer" href={d.href}>
          <T fr={d.description} ar={d.descriptionAr} />
        </SiteLink>
      </p>
    </div>
  );
}
