import { T } from "./i18n";
export type TileData = {
  ariaLabel: string;
  text: string;
  textAr?: string;
  description: string;
  descriptionAr?: string;
};
/** A content tile. */
export default function Tile({ d, cids }: { d: TileData; cids: string[] }) {
  return (
    <div data-cid={cids[0]} className="w-[31.5%] flex relative flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-1.5 max-md:w-[30%] md:max-lg:w-[32%] 2xl:w-[30%]">
      <div data-cid={cids[1]} className="block relative shrink-0">
        <div data-cid={cids[2]} className="contents">
          <span data-cid={cids[3]} className="inline-block relative min-w-[max-content] text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[2.5rem] font-semibold leading-11 tracking-[-0.8px] whitespace-nowrap text-nowrap max-lg:text-[2rem] max-lg:leading-[2.1875rem] max-lg:tracking-[-0.64px] 2xl:text-5xl 2xl:leading-[3.3125rem] 2xl:tracking-[-0.96px]" aria-label={d.ariaLabel}>
            <T fr={d.text} ar={d.textAr} />
          </span>
        </div>
      </div>
      <div data-cid={cids[4]} className="w-[378.7px] flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[6.3125rem] md:max-lg:w-58 2xl:w-[187.7px]">
        <p data-cid={cids[5]} className="block text-white/75 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.3125rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
          <T fr={d.description} ar={d.descriptionAr} />
        </p>
      </div>
    </div>
  );
}
