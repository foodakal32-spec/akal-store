import { T } from "../components/i18n";
import SiteLink from "../components/site-link";
import Tile, { type TileData } from "../components/tile";
import { Tile_cids } from "../_cids";
const Tile_data: TileData[] = [
    { ariaLabel: "100%", text: "100%", description: "Fait à la main", descriptionAr: "مصنوع يدوياً" },
    { ariaLabel: "0", text: "0", description: "Conservateur", descriptionAr: "مواد حافظة" },
    { ariaLabel: "100%", text: "100%", description: "Produits naturels", descriptionAr: "منتجات طبيعية" }
];
/** Machi section. */
export default function MachiSection({ tileData = Tile_data } = {}) {
  return (
    <div className="text-center w-full flex relative py-25 px-10 flex-col justify-start items-center content-center shrink-0 overflow-clip bg-[#0E2A3A] max-lg:py-20 max-lg:px-5 2xl:py-30 2xl:px-15" data-cid="n173" id="our-story">
      <div className="w-full max-w-337.5 flex relative flex-col justify-start items-center content-start shrink-0 gap-14 max-lg:gap-10 2xl:items-center 2xl:content-center 2xl:gap-24 2xl:[flex-direction:initial]" data-cid="n174">
        <div className="contents min-w-0" data-cid="n175">
          <div className="w-300 h-140 block relative rounded-[28px] shrink-0 overflow-clip max-md:w-[20.9375rem] max-lg:h-105 max-lg:rounded-3xl md:max-lg:w-182 2xl:w-[39.1875rem] 2xl:h-190 2xl:flex-1" data-cid="n176">
            <div className="h-full block absolute top-0 inset-x-0 rounded-[28px] max-lg:rounded-3xl" data-cid="n177">
              <img className="w-full h-140 block rounded-[28px] overflow-clip object-cover aspect-[auto_1558/1882] max-lg:h-105 max-lg:rounded-3xl 2xl:h-190" data-cid="n178" data-component="image" alt="" height="1882" sizes="min(100vw - 80px, 1350px)" src="/assets/akal/story.svg" srcSet="/assets/akal/story.svg" width="1558" />
            </div>
            <div className="w-120.5 h-[35.1625rem] block absolute -top-3.5 left-[clamp(167.5px,_50%,_calc(100%_-_167.5px))] shrink-0 aspect-[0.856749/1] transform-[matrix(1,0,0,1,-241,0)] max-lg:w-77 max-lg:h-[359.5px] max-lg:top-0 max-lg:transform-[matrix(1,0,0,1,-154,0)] 2xl:w-129.5 2xl:h-[37.7875rem] 2xl:top-[24.225rem] 2xl:transform-[matrix(1,0,0,1,-259,-302.305)]" data-cid="n179">
              <div className="h-full block absolute top-0 inset-x-0" data-cid="n180">
                <img className="w-full h-[35.1875rem] block overflow-clip object-cover aspect-[auto_1244/1452] max-lg:h-[22.4375rem] 2xl:h-[37.8125rem]" data-cid="n181" data-component="image" alt="" height="1452" sizes="482px" src="/assets/akal/rose-water-1.svg" srcSet="/assets/akal/rose-water-1.svg" width="1244" />
              </div>
            </div>
            <div className="w-[686.5px] h-[15.1875rem] flex absolute top-12.5 left-[clamp(167.5px,_50%,_calc(100%_-_167.5px))] opacity-10 flex-col justify-start shrink-0 whitespace-pre text-nowrap transform-[matrix(1,0,0,1,-343.227,0)] max-lg:w-[21.5375rem] max-lg:h-30.5 max-lg:top-10 max-lg:transform-[matrix(1,0,0,1,-172.32,0)] 2xl:w-[37.25rem] 2xl:h-[13.1875rem] 2xl:transform-[matrix(1,0,0,1,-298.031,0)]" data-cid="n182">
              <h1 className="h-full block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[15.1875rem] font-bold leading-[15.1875rem] tracking-[-9.72px] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[7.625rem] max-lg:leading-30.5 max-lg:tracking-[-4.88px] 2xl:text-[13.1875rem] 2xl:leading-[13.1875rem] 2xl:tracking-[-8.44px]" data-cid="n183" data-component="heading" dir="auto">
                <span className="inline-block -m-[2.275rem] p-[36.5px] [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:var(--clr-0)] max-lg:m-[-18.3px] max-lg:p-[18.3px] 2xl:-m-[1.975rem] 2xl:p-[31.7px]" style={{ backgroundImage: "linear-gradient(0deg, var(--clr-0) 0%, var(--foreground) 100%)" }} data-cid="n184">
                  AKAL
                </span>
              </h1>
            </div>
          </div>
        </div>
        <div className="w-300 flex relative flex-col justify-start items-center content-start shrink-0 gap-12 max-md:w-[20.9375rem] max-lg:gap-9 md:max-lg:w-182 2xl:w-[39.1875rem] 2xl:flex-1" data-cid="n185">
          <div className="w-full flex relative flex-col justify-start items-center content-start shrink-0 gap-6" data-cid="n186">
            <div className="w-[84.7px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n187">
              <p className="block text-accent [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[0.8125rem] font-semibold leading-[1rem] tracking-[1.04px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n188" dir="auto">
                <T fr={"Notre histoire"} ar={"قصتنا"} />
              </p>
            </div>
            <div className="w-full flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[20.9375rem] md:max-lg:w-182 2xl:w-[39.1875rem]" data-cid="n189">
              <h1 className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[3.25rem] font-bold leading-[3.4375rem] tracking-[-1.56px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[2.5rem] max-lg:leading-10.5 max-lg:tracking-[-1.2px] 2xl:text-[4rem] 2xl:leading-[4.1875rem] 2xl:tracking-[-1.92px]" data-cid="n190" data-component="heading" dir="auto">
                <T fr={"Fait main,"} ar={"مصنوع يدوياً،"} />
              </h1>
              <h2 className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[3.25rem] font-bold leading-[3.4375rem] tracking-[-1.56px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[2.5rem] max-lg:leading-10.5 max-lg:tracking-[-1.2px] 2xl:text-[4rem] 2xl:leading-[4.1875rem] 2xl:tracking-[-1.92px]" data-cid="n191" data-component="heading" dir="auto">
                <T fr={"avec le plus grand soin"} ar={"بكل عناية"} />
              </h2>
            </div>
            <div className="mx-auto w-full max-w-130 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]" data-cid="n192">
              <p className="block text-white/75 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-lg leading-[1.6875rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] 2xl:text-xl 2xl:leading-7.5" data-cid="n193" dir="auto">
                <T fr={"AKAL est une marque marocaine de produits naturels, faits maison et 100% à la main, sans conservateurs."} ar={"أكال علامة مغربية لمنتجات طبيعية، منزلية الصنع ومصنوعة يدوياً 100%، بدون مواد حافظة."} />
              </p>
              <p className="block mt-5 text-white/75 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-lg leading-[1.6875rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] 2xl:text-xl 2xl:leading-7.5" data-cid="n194" dir="auto">
                <T fr={"Sucre et sirop de dattes, mastic, eau de rose et bien d’autres produits, pour une vie plus saine."} ar={"سكر التمر ودبس التمر، المسكة، ماء الورد ومنتجات أخرى كثيرة، لحياة أكثر صحة."} />
              </p>
            </div>
          </div>
          <div className="w-full flex relative pt-8 justify-center items-center content-start shrink-0 gap-8 max-lg:pt-6 max-lg:gap-4 after:content-[''] after:block after:absolute after:inset-0" data-cid="n195">
            {tileData.map((d, i) => <Tile key={i} d={d} cids={Tile_cids[i]} />)}
          </div>
          <div className="contents min-w-0" data-cid="n214">
            <div className="block relative shrink-0" data-cid="n215">
              <SiteLink className="w-[14.3875rem] h-[3.9375rem] flex relative py-5.5 px-10 rounded-[99px] justify-center items-center content-center gap-2 overflow-clip text-primary bg-color-001 cursor-pointer after:content-[''] after:block after:absolute after:inset-0 after:w-[14.3875rem] after:h-[3.9375rem] after:rounded-tl-[99px]" data-cid="n216" data-component="link" href="/#organic-beans">
                <div className="w-[9.3875rem] h-[1.1875rem] flex relative flex-col justify-start items-center content-center shrink-0 overflow-clip" data-cid="n217">
                  <div className="w-[9.3875rem] flex relative flex-col justify-start items-center content-center shrink-0" data-cid="n218">
                    <div className="w-[9.3875rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n219">
                      <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n220" dir="auto">
                        <T fr={"Nos valeurs"} ar={"قيمنا"} />
                      </p>
                    </div>
                    <div className="w-[9.3875rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n221">
                      <p className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n222" dir="auto">
                        <T fr={"Nos valeurs"} ar={"قيمنا"} />
                      </p>
                    </div>
                  </div>
                </div>
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
