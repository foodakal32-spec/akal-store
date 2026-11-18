import DittoMotion from "./ditto/DittoMotion";
import HeroSection from "./sections/hero-section";
import ProductGridSection from "./sections/product-grid-section";
import MachiSection from "./sections/machi-section";
import ReviewsSection from "./components/stagger-testimonials";
import RealOrganicBeansSection from "./sections/real-organic-beans-section";
import LogoCloudSection from "./sections/logo-cloud-section";

export default function Page() {
  return (
    <>
      <div className="block" data-cid="n1" id="main">
        <div className="min-h-screen flex relative flex-col justify-start items-center content-center overflow-clip bg-background" data-cid="n2">
          <div className="contents min-w-0" data-cid="n3">
            <HeroSection />
          </div>
          <ProductGridSection />
          <MachiSection />
          <ReviewsSection />
          <div className="contents min-w-0" data-cid="n223">
            <RealOrganicBeansSection />
          </div>
          <div className="contents min-w-0" data-cid="n242">
            <LogoCloudSection />
          </div>
        </div>
        <div className="block" data-cid="n373" id="overlay" />
      </div>
      {" "}
      <DittoMotion spec={{"waapi":[],"rotators":[],"reveals":[],"marquees":[]}} />
    </>
  );
}
