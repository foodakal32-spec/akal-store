import { T } from "../components/i18n";
import SiteLink from "../components/site-link";
import ProductCard from "../components/product-card";
import { ProductCard_cids } from "../_cids";
import { ProductCard_styles } from "../_styles";
import { products as productsContent } from "../content";
/** Product Grid section. */
export default function ProductGridSection({ products = productsContent.slice(0, 3), showButton = false }: { products?: typeof productsContent; showButton?: boolean } = {}) {
  return (
    <div className="w-full flex relative py-25 px-10 flex-col justify-start items-center content-center shrink-0 overflow-clip bg-[#1E504D] max-lg:py-20 max-lg:px-5 2xl:py-30 2xl:px-15" data-cid="n77" id="products">
      <div className="w-full max-w-337.5 flex relative flex-col justify-start items-start content-start shrink-0 gap-12 max-lg:gap-8" data-cid="n78">
        <div className="w-full flex relative flex-wrap justify-between items-end content-end shrink-0 max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:gap-6" data-cid="n79">
          <div className="w-[425.5px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-md:w-full max-lg:whitespace-pre-wrap max-lg:[word-break:break-word] max-lg:[overflow-wrap:break-word] max-lg:[text-wrap:initial] md:max-lg:w-full 2xl:w-[523.7px]" data-cid="n80">
            <h1 className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[3.25rem] font-bold leading-[3.4375rem] tracking-[-1.56px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[2.5rem] max-lg:leading-10.5 max-lg:tracking-[-1.2px] 2xl:text-[4rem] 2xl:leading-[4.1875rem] 2xl:tracking-[-1.92px]" data-cid="n81" data-component="heading" dir="auto">
              <T fr={"Nos produits"} ar={"منتجاتنا"} />
            </h1>
            <h2 className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[3.25rem] font-bold leading-[3.4375rem] tracking-[-1.56px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[2.5rem] max-lg:leading-10.5 max-lg:tracking-[-1.2px] 2xl:text-[4rem] 2xl:leading-[4.1875rem] 2xl:tracking-[-1.92px]" data-cid="n82" data-component="heading" dir="auto">
              <T fr={"faits main"} ar={"المصنوعة يدوياً"} />
            </h2>
          </div>
          {showButton && <div className="contents min-w-0" data-cid="n83">
            <div className="block relative shrink-0" data-cid="n84">
              <SiteLink className="w-[204.9px] h-[3.9375rem] flex relative py-5.5 px-10 rounded-[99px] justify-center items-center content-center gap-2 overflow-clip text-primary bg-background cursor-pointer after:content-[''] after:block after:absolute after:inset-0 after:w-[204.9px] after:h-[3.9375rem] after:rounded-tl-[99px]" data-cid="n85" data-component="link" href="/produits">
                <div className="w-[124.9px] h-[1.1875rem] flex relative flex-col justify-start items-center content-center shrink-0 overflow-clip" data-cid="n86">
                  <div className="w-[124.9px] flex relative flex-col justify-start items-center content-center shrink-0" data-cid="n87">
                    <div className="w-[124.9px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n88">
                      <p className="block text-color-001 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n89" dir="auto">
                        <T fr={"Tous les produits"} ar={"جميع المنتجات"} />
                      </p>
                    </div>
                    <div className="w-[124.9px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n90">
                      <p className="block text-color-001 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n91" dir="auto">
                        <T fr={"Tous les produits"} ar={"جميع المنتجات"} />
                      </p>
                    </div>
                  </div>
                </div>
              </SiteLink>
            </div>
          </div>}
        </div>
        <div className="w-full grid relative justify-center shrink-0 gap-8 [grid-auto-rows:minmax(0px,_1fr)] grid-cols-3 max-md:w-full max-lg:flex max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:gap-5 max-lg:grid-cols-[repeat(2,_minmax(50px,_1fr))] max-lg:grid-rows-1 md:max-lg:w-full 2xl:w-337.5" data-cid="n92">
          {products.map((d, i) => <ProductCard key={i} d={d} cids={ProductCard_cids[i % ProductCard_cids.length]} styles={ProductCard_styles[i % ProductCard_styles.length]} />)}
        </div>
      </div>
    </div>
  );
}
