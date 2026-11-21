import { T } from "../components/i18n";
import SiteLink from "../components/site-link";
/** Real Organic Beans section. */
export default function RealOrganicBeansSection() {
  return (
    <div className="w-full h-160 flex relative py-14 px-10 flex-col justify-start items-center content-center shrink-0 overflow-clip max-lg:h-140 max-lg:py-12 max-lg:px-5 2xl:h-205 2xl:py-18 2xl:px-15" data-cid="n224" id="organic-beans">
      <div className="h-full block absolute top-0 inset-x-0 min-w-0" data-cid="n225">
        <img className="w-full h-160 block overflow-clip object-cover aspect-[auto_1448/1086] max-lg:h-140 2xl:h-205" data-cid="n226" data-component="image" alt="" height="1086" sizes="(min-width: 1470px) 100vw, (min-width: 810px) and (max-width: 1469.98px) 100vw, (max-width: 809.98px) 100vw" src="/assets/akal/story.svg" srcSet="/assets/akal/story.svg" width="1448" />
      </div>
      <div className="w-[84.8rem] h-[63.6rem] block absolute top-[clamp(280px,_50%,_calc(100%_-_280px))] left-[clamp(187.5px,_50%,_calc(100%_-_187.5px))] z-1 min-w-0 shrink-0 aspect-[1.3333/1] transform-[matrix(1,0,0,1,-678.398,-508.805)] max-md:w-[787.5px] max-md:h-[36.9125rem] max-md:transform-[matrix(1,0,0,1,-393.75,-295.312)] md:max-lg:w-[100.8rem] md:max-lg:h-[75.6rem] md:max-lg:transform-[matrix(1,0,0,1,-806.398,-604.812)] 2xl:w-480 2xl:h-[90rem] 2xl:transform-[matrix(1,0,0,1,-960,-720.016)]" data-cid="n227">
        
      </div>
      <div className="h-full block absolute top-0 inset-x-0 min-w-0 shrink-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(160deg, var(--clr-6) 0%, var(--clr-7) 35%, var(--clr-0) 60%)" }} data-cid="n229" />
      <div className="w-full max-w-337.5 flex relative z-1 flex-col justify-start items-start content-start shrink-0 gap-7 max-lg:gap-6" data-cid="n230">
        <div className="w-full max-w-155 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]" data-cid="n231">
          <h2 className="block text-background [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[2.125rem] font-semibold leading-[2.4rem] tracking-[-0.8px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:text-[1.625rem] max-lg:leading-[1.9rem] max-lg:tracking-[-0.64px] 2xl:text-5xl 2xl:leading-[3.3125rem] 2xl:tracking-[-0.96px]" data-cid="n232" data-component="heading" dir="auto">
            <T fr={"Des produits naturels."} ar={"منتجات طبيعية،"} />
            <br className="inline" data-cid="n233" />
            <T fr={"Un vrai savoir-faire marocain."} ar={"وحِرفية مغربية أصيلة."} />
          </h2>
        </div>
        <div className="w-[10.525rem] block relative shrink-0" data-cid="n234">
          <SiteLink className="w-[10.525rem] h-[3.9375rem] flex relative py-5.5 px-10 rounded-[99px] justify-center items-center content-center gap-2 overflow-clip text-primary bg-background cursor-pointer after:content-[''] after:block after:absolute after:inset-0 after:w-[10.525rem] after:h-[3.9375rem] after:rounded-tl-[99px]" data-cid="n235" data-component="link" href="https://www.instagram.com/akal.fr">
            <div className="w-[5.525rem] h-[1.1875rem] flex relative flex-col justify-start items-center content-center shrink-0 overflow-clip" data-cid="n236">
              <div className="w-[5.525rem] flex relative flex-col justify-start items-center content-center shrink-0" data-cid="n237">
                <div className="w-[5.525rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n238">
                  <p className="block text-color-001 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n239" dir="auto">
                    <T fr={"Instagram"} ar={"إنستغرام"} />
                  </p>
                </div>
                <div className="w-[5.525rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap" data-cid="n240">
                  <p className="block text-color-001 [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-center [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n241" dir="auto">
                    <T fr={"Instagram"} ar={"إنستغرام"} />
                  </p>
                </div>
              </div>
            </div>
          </SiteLink>
        </div>
      </div>
    </div>
  );
}
