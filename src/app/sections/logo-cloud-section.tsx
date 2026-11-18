import FooterLegalLinks from "../components/footer-legal-links";
import { T } from "../components/i18n";
import Tile2 from "../components/tile2";
import Tile3 from "../components/tile3";
import Logo, { type LogoData } from "../components/logo";
import Icon from "../svgs/svg-icon";
import Tile4 from "../components/tile4";
import Tile5 from "../components/tile5";
import Logo2, { type Logo2Data } from "../components/logo2";
import Illustration from "../svgs/svg-illustration";
import { Tile2_cids, Tile3_cids, Logo_cids, Tile4_cids, Tile5_cids, Logo2_cids } from "../_cids";
import { Tile2_styles, Tile3_styles, Tile4_styles, Tile5_styles } from "../_styles";
import { tile2Data as tile2DataContent, tile3Data as tile3DataContent, tile4Data as tile4DataContent, tile5Data as tile5DataContent } from "../content";
import { InstagramSocialIcon, FacebookSocialIcon, YouTubeSocialIcon } from "../components/social-icons";
const Logo_data: LogoData[] = [
    { href: "https://www.instagram.com/akal.fr", icon: <InstagramSocialIcon className="w-5 h-5 text-white" /> },
    { href: "https://www.facebook.com/", icon: <FacebookSocialIcon className="w-5 h-5 text-white" /> },
    { href: "https://www.youtube.com/", icon: <YouTubeSocialIcon className="w-5 h-5 text-white" /> }
];
const Logo2_data: Logo2Data[] = [
    { href: "https://www.instagram.com/akal.fr", icon: <InstagramSocialIcon className="w-5 h-5 text-white" /> },
    { href: "https://www.facebook.com/", icon: <FacebookSocialIcon className="w-5 h-5 text-white" /> },
    { href: "https://www.youtube.com/", icon: <YouTubeSocialIcon className="w-5 h-5 text-white" /> }
];
/** Logo Cloud section. */
export default function LogoCloudSection({ tile2Data = tile2DataContent, tile3Data = tile3DataContent, logoData = Logo_data, tile4Data = tile4DataContent, tile5Data = tile5DataContent, logos = Logo2_data, bgClassName = "bg-[#0C0E0F]" }: { tile2Data?: any; tile3Data?: any; logoData?: any; tile4Data?: any; tile5Data?: any; logos?: any; bgClassName?: string } = {}) {
  return (
    <div className="w-full block relative shrink-0" data-cid="n243">
      <footer className={`hidden max-lg:flex max-lg:relative max-lg:pt-14 max-lg:pb-6 max-lg:px-5 max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:gap-10 max-lg:overflow-clip ${bgClassName}`} data-cid="n244">
        <div className="hidden max-lg:w-full max-lg:flex max-lg:relative max-lg:flex-col max-lg:flex-wrap max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:shrink-0 max-lg:gap-11" data-cid="n245">
          <div className="hidden max-md:w-full max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:shrink-0 max-lg:gap-9 md:max-lg:w-full" data-cid="n246">
            <div className="hidden max-lg:w-full max-lg:max-w-95 max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre-wrap max-lg:[word-break:break-word] max-lg:[overflow-wrap:break-word]" data-cid="n247">
              <h3 className="hidden max-lg:block max-lg:text-white max-lg:[font-family:Inter,_'Inter_Placeholder',_sans-serif] max-lg:text-2xl max-lg:font-semibold max-lg:leading-[1.8125rem] max-lg:tracking-[-0.24px] max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n248" dir="auto">
                <T fr={"Produits naturels faits maison, 100% à la main, sans conservateurs, pour une vie plus saine."} ar={"منتجات طبيعية منزلية الصنع، مصنوعة يدوياً 100%، بدون مواد حافظة، لحياة أكثر صحة."} />
              </h3>
            </div>
            <div className="hidden max-lg:w-full max-lg:max-w-100 max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:shrink-0 max-lg:gap-3" data-cid="n249">
              <div className="hidden max-lg:w-[4.4375rem] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre max-lg:text-nowrap" data-cid="n250">
                <p className="hidden max-lg:block max-lg:text-white max-lg:[font-family:Inter,_'Inter_Placeholder',_sans-serif] max-lg:text-sm max-lg:leading-[1.3125rem] max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n251" dir="auto">
                  <T fr={"Newsletter"} ar={"النشرة البريدية"} />
                </p>
              </div>
              <form className="hidden max-lg:w-full max-lg:flex max-lg:relative max-lg:py-[0.3125rem] max-lg:pr-[0.3125rem] max-lg:pl-5.5 max-lg:rounded-[99px] max-lg:justify-start max-lg:items-center max-lg:content-center max-lg:shrink-0 max-lg:gap-2 max-lg:overflow-clip max-lg:bg-[#17191B]" data-cid="n252">
                <div className="hidden max-md:w-[63%] max-lg:h-[2.6875rem] max-lg:flex max-lg:relative max-lg:items-center max-lg:grow max-lg:shrink-0 max-lg:basis-0 max-lg:overflow-hidden md:max-lg:w-[69.5%] after:content-[''] after:block after:absolute after:inset-0 after:w-[12.1125rem] after:h-[2.6875rem] md:max-lg:after:w-[16.175rem] 2xl:after:hidden" data-cid="n253">
                  <input className="hidden max-lg:w-full max-lg:h-[2.6875rem] max-lg:block max-lg:min-w-0 max-lg:flex-1 max-lg:overflow-clip max-lg:text-white max-lg:placeholder:text-white/50 max-lg:[font-family:Inter] max-lg:text-base max-lg:leading-[1.1875rem] max-lg:whitespace-nowrap max-lg:text-nowrap max-lg:cursor-text" data-cid="n254" name="Email" placeholder="name@email.com" type="email" defaultValue="" />
                </div>
                <div className="hidden max-lg:w-auto max-lg:block max-lg:relative max-lg:shrink-0" data-cid="n255">
                  <button className="hidden max-lg:h-[2.6875rem] max-lg:flex max-lg:relative max-lg:py-3 max-lg:px-6 max-lg:rounded-[99px] max-lg:justify-center max-lg:items-center max-lg:content-center max-lg:overflow-clip max-lg:text-center max-lg:bg-[#0C0E0F] max-lg:cursor-pointer after:content-[''] after:block after:absolute after:inset-0 after:w-[6.6375rem] after:h-[2.6875rem] after:rounded-tl-[99px] 2xl:after:hidden" data-cid="n256" type="submit">
                    <div className="hidden max-lg:w-auto max-lg:h-[1.1875rem] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:items-center max-lg:content-center max-lg:shrink-0 max-lg:overflow-clip" data-cid="n257">
                      <div className="hidden max-lg:w-auto max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:items-center max-lg:content-center max-lg:shrink-0" data-cid="n258">
                        <div className="hidden max-lg:w-auto max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre max-lg:text-nowrap" data-cid="n259">
                          <p className="hidden max-lg:block max-lg:text-white max-lg:[font-family:Inter,_'Inter_Placeholder',_sans-serif] max-lg:text-base max-lg:font-semibold max-lg:leading-[1.1875rem] max-lg:text-start max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n260" dir="auto">
                            <T fr={"S’inscrire"} ar={"اشترك"} />
                          </p>
                        </div>
                        <div className="hidden max-lg:w-auto max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre max-lg:text-nowrap" data-cid="n261">
                          <p className="hidden max-lg:block max-lg:text-white max-lg:[font-family:Inter,_'Inter_Placeholder',_sans-serif] max-lg:text-base max-lg:font-semibold max-lg:leading-[1.1875rem] max-lg:text-start max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n262" dir="auto">
                            <T fr={"S’inscrire"} ar={"اشترك"} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden max-lg:w-full max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:shrink-0 max-lg:gap-6" data-cid="n263">
            <div className="hidden max-lg:w-[102.3px] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre max-lg:text-nowrap" data-cid="n264">
              <h3 className="hidden max-lg:block max-lg:text-white max-lg:[font-family:Inter,_'Inter_Placeholder',_sans-serif] max-lg:text-2xl max-lg:font-semibold max-lg:leading-[1.8125rem] max-lg:tracking-[-0.24px] max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n265" dir="auto">
                <T fr={"Produits"} ar={"المنتجات"} />
              </h3>
            </div>
            <div className="hidden max-lg:w-full max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:shrink-0 max-lg:gap-2.5" data-cid="n266">
              {tile2Data.map((d, i) => <Tile2 key={i} d={d} cids={Tile2_cids[i]} styles={Tile2_styles[i]} />)}
            </div>
          </div>
          <div className="hidden max-lg:w-full max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:shrink-0 max-lg:gap-6" data-cid="n279">
            <div className="hidden max-lg:w-[6.9125rem] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre max-lg:text-nowrap" data-cid="n280">
              <h3 className="hidden max-lg:block max-lg:text-white max-lg:[font-family:Inter,_'Inter_Placeholder',_sans-serif] max-lg:text-2xl max-lg:font-semibold max-lg:leading-[1.8125rem] max-lg:tracking-[-0.24px] max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n281" dir="auto">
                <T fr={"Société"} ar={"الشركة"} />
              </h3>
            </div>
            <div className="hidden max-lg:w-full max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:shrink-0 max-lg:gap-2.5" data-cid="n282">
              {tile3Data.map((d, i) => <Tile3 key={i} d={d} cids={Tile3_cids[i]} styles={Tile3_styles[i]} />)}
            </div>
            <div className="hidden max-lg:w-full max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:shrink-0 max-lg:gap-3" data-cid="n292">
              <div className="hidden max-lg:w-[42.5px] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre max-lg:text-nowrap" data-cid="n293">
                <p className="hidden max-lg:block max-lg:text-white max-lg:[font-family:Inter,_'Inter_Placeholder',_sans-serif] max-lg:text-sm max-lg:leading-[1.3125rem] max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n294" dir="auto">
                  <T fr={"Suivre"} ar={"تابعنا"} />
                </p>
              </div>
              <div className="hidden max-lg:flex max-lg:relative max-lg:justify-start max-lg:items-center max-lg:content-center max-lg:shrink-0 max-lg:gap-2" data-cid="n295">
                {logoData.map((d, i) => <Logo key={i} d={d} cids={Logo_cids[i]} />)}
              </div>
            </div>
          </div>
        </div>
        <FooterLegalLinks />
        <Icon cid={"n302"} />
        <div className="hidden max-lg:w-full max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:content-start max-lg:shrink-0 max-lg:gap-2" data-cid="n303">
          <div className="hidden max-lg:w-[12.1rem] max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre max-lg:text-nowrap" data-cid="n304">
            <p className="hidden max-lg:block max-lg:text-white max-lg:[font-family:Inter,_'Inter_Placeholder',_sans-serif] max-lg:text-sm max-lg:leading-[1.3125rem] max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" data-cid="n305" dir="auto">
              <T fr={"Copyright 2026 AKAL"} ar={"© 2026 أكال. جميع الحقوق محفوظة"} />
            </p>
          </div>
        </div>
      </footer>
      <div className="contents max-lg:hidden" data-cid="n308">
        <footer className={`flex relative pt-16 pb-7 px-10 flex-col justify-start items-start content-start gap-12 overflow-clip max-lg:hidden 2xl:pt-20 2xl:pb-8 2xl:px-15 2xl:gap-14 ${bgClassName}`} data-cid="n309">
          <div className="w-full flex relative flex-nowrap justify-start items-start content-start shrink-0 gap-y-12 gap-x-8 max-lg:hidden 2xl:gap-y-8" data-cid="n310">
            <div className="basis-0 grow-[2] min-w-0 flex relative flex-col justify-start items-start content-start shrink-0 gap-9 max-lg:hidden" data-cid="n311">
              <div className="w-95 flex relative max-w-95 flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-lg:hidden" data-cid="n312">
                <h3 className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[1.75rem] font-semibold leading-[2.125rem] tracking-[-0.28px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden 2xl:text-[2rem] 2xl:leading-[2.375rem] 2xl:tracking-[-0.32px]" data-cid="n313" data-component="heading" dir="auto">
                  <T fr={"Produits naturels faits maison, 100% à la main, sans conservateurs, pour une vie plus saine."} ar={"منتجات طبيعية منزلية الصنع، مصنوعة يدوياً 100%، بدون مواد حافظة، لحياة أكثر صحة."} />
                </h3>
              </div>
              <div className="w-full flex relative max-w-100 flex-col justify-start items-start content-start shrink-0 gap-3 max-lg:hidden" data-cid="n314">
                <div className="w-[4.4375rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden" data-cid="n315">
                  <p className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.3125rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" data-cid="n316" dir="auto">
                    <T fr={"Newsletter"} ar={"النشرة البريدية"} />
                  </p>
                </div>
                <form className="w-full flex relative py-[0.3125rem] pr-[0.3125rem] pl-5.5 rounded-[99px] justify-start items-center content-center shrink-0 gap-2 overflow-clip bg-[#17191B] max-lg:hidden" data-cid="n317">
                  <div className="w-[16.175rem] h-[2.6875rem] flex relative items-center grow shrink-0 basis-0 overflow-hidden max-lg:hidden after:content-[''] after:block after:absolute after:inset-0 after:w-[16.175rem] after:h-[2.6875rem] max-lg:after:hidden" data-cid="n318">
                    <input className="w-full h-[2.6875rem] block min-w-0 flex-1 overflow-clip text-white placeholder:text-white/50 [font-family:Inter] text-base leading-[1.1875rem] whitespace-nowrap text-nowrap cursor-text max-lg:hidden" data-cid="n319" data-component="input" name="Email" placeholder="name@email.com" type="email" defaultValue="" />
                  </div>
                  <div className="w-[6.6375rem] block relative shrink-0 max-lg:hidden" data-cid="n320">
                    <button className="h-[2.6875rem] flex relative py-3 px-6 rounded-[99px] justify-center items-center content-center overflow-clip text-center bg-[#0C0E0F] cursor-pointer max-lg:hidden after:content-[''] after:block after:absolute after:inset-0 after:w-[6.6375rem] after:h-[2.6875rem] after:rounded-tl-[99px] max-lg:after:hidden" data-cid="n321" data-component="button" type="submit">
                      <div className="w-[3.6375rem] h-[1.1875rem] flex relative flex-col justify-start items-center content-center shrink-0 overflow-clip max-lg:hidden" data-cid="n322">
                        <div className="w-[3.6375rem] flex relative flex-col justify-start items-center content-center shrink-0 max-lg:hidden" data-cid="n323">
                          <div className="w-[3.6375rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden" data-cid="n324">
                            <p className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-start [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" data-cid="n325" dir="auto">
                              <T fr={"S’inscrire"} ar={"اشترك"} />
                            </p>
                          </div>
                          <div className="w-[3.6375rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden" data-cid="n326">
                            <p className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-base font-semibold leading-[1.1875rem] text-start [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" data-cid="n327" dir="auto">
                              <T fr={"S’inscrire"} ar={"اشترك"} />
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-146 flex relative flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-6 max-lg:hidden 2xl:w-108.5" data-cid="n328">
              <div className="w-[119.3px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden 2xl:w-[8.525rem]" data-cid="n329">
                <h3 className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[1.75rem] font-semibold leading-[2.125rem] tracking-[-0.28px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden 2xl:text-[2rem] 2xl:leading-[2.375rem] 2xl:tracking-[-0.32px]" data-cid="n330" data-component="heading" dir="auto">
                  <T fr={"Produits"} ar={"المنتجات"} />
                </h3>
              </div>
              <div className="w-full flex relative flex-col justify-start items-start content-start shrink-0 gap-2.5 max-lg:hidden" data-cid="n331">
                {tile4Data.map((d, i) => <Tile4 key={i} d={d} cids={Tile4_cids[i]} styles={Tile4_styles[i]} />)}
              </div>
            </div>
            <div className="w-146 flex relative flex-col justify-start items-start content-start grow shrink-0 basis-0 gap-6 max-lg:hidden 2xl:w-108.5" data-cid="n344">
              <div className="w-[8.0625rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden 2xl:w-[147.5px]" data-cid="n345">
                <h3 className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-[1.75rem] font-semibold leading-[2.125rem] tracking-[-0.28px] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden 2xl:text-[2rem] 2xl:leading-[2.375rem] 2xl:tracking-[-0.32px]" data-cid="n346" data-component="heading" dir="auto">
                  <T fr={"Société"} ar={"الشركة"} />
                </h3>
              </div>
              <div className="w-full flex relative flex-col justify-start items-start content-start shrink-0 gap-2.5 max-lg:hidden" data-cid="n347">
                {tile5Data.map((d, i) => <Tile5 key={i} d={d} cids={Tile5_cids[i]} styles={Tile5_styles[i]} />)}
              </div>
              <div className="w-full flex relative flex-col justify-start items-start content-start shrink-0 gap-3 max-lg:hidden" data-cid="n357">
                <div className="w-[42.5px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden" data-cid="n358">
                  <p className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.3125rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" data-cid="n359" dir="auto">
                    <T fr={"Suivre"} ar={"تابعنا"} />
                  </p>
                </div>
                <div className="flex relative justify-start items-center content-center shrink-0 gap-2 max-lg:hidden" data-cid="n360">
                  {logos.map((d, i) => <Logo2 key={i} d={d} cids={Logo2_cids[i]} />)}
                </div>
              </div>
            </div>
          </div>
          <FooterLegalLinks />
          <Illustration cid={"n367"} />
          <div className="w-full flex relative justify-between items-center content-center shrink-0 max-lg:hidden" data-cid="n368">
            <div className="w-[12.1rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-lg:hidden" data-cid="n369">
              <p className="block text-white [font-family:Inter,_'Inter_Placeholder',_sans-serif] text-sm leading-[1.3125rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-lg:hidden" data-cid="n370" dir="auto">
                <T fr={"Copyright 2026 AKAL"} ar={"© 2026 أكال. جميع الحقوق محفوظة"} />
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
