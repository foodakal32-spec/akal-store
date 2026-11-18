import OfferButton from "./offer-button";
import { T } from "./i18n";
import type { ProductCardStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type ProductCardData = {
  slug: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  imgSrc: string;
  srcSet: string;
  width: string;
};
/** A product card. */
export default function ProductCard({ d, cids, styles }: { d: ProductCardData; cids: string[]; styles: ProductCardStyles }) {
  return (
    <div data-cid={cids[0]} className={cn("w-full h-160 flex relative pt-9 px-8 rounded-[28px] flex-col justify-start items-start content-start [align-self:start] shrink-0 gap-7 overflow-clip max-md:w-full max-lg:h-140 max-lg:pt-8 max-lg:px-6 max-lg:rounded-3xl max-lg:gap-6 max-lg:[align-self:initial] md:max-lg:w-full 2xl:w-full 2xl:h-190 2xl:pt-12 2xl:px-12", styles.className)}>
      <div data-cid={cids[1]} className="card-glass w-fit max-w-full self-center flex relative z-[1] -mt-6 px-6 py-3.5 rounded-full max-lg:-mt-5 2xl:-mt-9 flex-col justify-start items-start content-start shrink-0 gap-3.5 max-md:w-full md:max-lg:w-full">
        <div data-cid={cids[2]} className="w-full flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-full md:max-lg:w-full">
          <h3 data-cid={cids[3]} className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[1.75rem] font-semibold leading-[2.125rem] tracking-[-0.28px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-2xl max-lg:leading-[1.8125rem] max-lg:tracking-[-0.24px] 2xl:text-[2rem] 2xl:leading-[2.375rem] 2xl:tracking-[-0.32px]" data-component="heading" dir="auto">
            <T fr={d.title} ar={d.titleAr} />
          </h3>
        </div>
        <div data-cid={cids[4]} className="hidden w-full max-w-100 flex relative flex-col justify-start shrink-0">
          <p data-cid={cids[5]} className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base leading-[1.625rem] text-balance [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
            <T fr={d.description} ar={d.descriptionAr} />
          </p>
        </div>
      </div>
      <div data-cid={cids[6]} className="contents min-w-0">
        <div data-cid={cids[7]} className="block absolute z-[1] bottom-7 left-1/2 -translate-x-1/2 max-lg:bottom-6 2xl:bottom-10 shrink-0">
          <OfferButton
            variant="compact"
            href={`/produits/${d.slug}`}
            label={<T fr="Commander" ar="اطلب الآن" />}
          />
        </div>
      </div>
      <div data-cid={cids[15]} className="absolute inset-0 z-0 pointer-events-none">
        <div data-cid={cids[16]} className="contents min-w-0">
          <div data-cid={cids[17]} className="w-full h-full block relative shrink-0">
            <div data-cid={cids[18]} className="h-full block absolute top-0 inset-x-0">
              <img data-cid={cids[19]} className={cn("w-full h-full block overflow-clip object-cover object-bottom", styles.className2)} data-component="image" alt="" height="1000" sizes="(max-width: 571px) 100vw, 420px" src={d.imgSrc} srcSet={d.srcSet} width={d.width} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
