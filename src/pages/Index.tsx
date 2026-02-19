import { useEffect } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import StickyProfile from "@/components/StickyProfile";
import DesktopNav from "@/components/DesktopNav";
import NicheCases from "@/components/NicheCases";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import HeroCTA from "@/components/HeroCTA";
import SectionReveal from "@/components/SectionReveal";
import FloatingCTAs from "@/components/FloatingCTAs";
import { trackPageView } from "@/lib/tracking";

const Index = () => {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <>
      <AnimatedBackground />
      <ThemeToggle />
      <FloatingCTAs />

      <div className="min-h-screen px-4 py-8 lg:py-12 pb-24 lg:pb-12">
        <div className="mx-auto max-w-7xl lg:flex lg:gap-10 xl:gap-14">
          {/* Left column — sticky on desktop */}
          <aside className="lg:w-[320px] xl:w-[340px] lg:shrink-0 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto scrollbar-hide">
            <div className="hidden lg:block">
              <StickyProfile />
            </div>
            <div className="lg:hidden">
              <HeroCTA />
            </div>
          </aside>

          {/* Right column — scrollable content */}
          <main className="flex-1 max-w-[560px] md:max-w-none mt-6 lg:mt-0 mx-auto lg:mx-0">
            <DesktopNav />

            {/* Cases por nicho — unified proof section */}
            <SectionReveal id="cases">
              <NicheCases />
            </SectionReveal>

            <SectionReveal id="produtos">
              <ProductsSection />
            </SectionReveal>

            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;
