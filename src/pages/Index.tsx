import { useEffect } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import StickyProfile from "@/components/StickyProfile";
import DesktopNav from "@/components/DesktopNav";
import SocialProof from "@/components/SocialProof";
import ProofSection from "@/components/ProofSection";
import NicheCases from "@/components/NicheCases";
import ProductsSection from "@/components/ProductsSection";
import ChannelsSection from "@/components/ChannelsSection";
import SecondaryLinks from "@/components/SecondaryLinks";
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

      <div className="min-h-screen px-4 py-8 lg:py-12">
        {/* Desktop: 2-col | Tablet: 2-col compact | Mobile: single col */}
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

          {/* Right column — scrollable content, wider on desktop */}
          <main className="flex-1 max-w-[560px] md:max-w-none mt-6 lg:mt-0 mx-auto lg:mx-0">
            <DesktopNav />

            {/* Row 1: Credibility — Social proof + Niche cases side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-6">
              <SectionReveal>
                <SocialProof />
              </SectionReveal>
              <SectionReveal id="cases">
                <NicheCases />
              </SectionReveal>
            </div>

            {/* Row 2: Results timeline — full width, 2-col cards on desktop */}
            <SectionReveal>
              <ProofSection />
            </SectionReveal>

            {/* Row 3: Products + Service/Content — horizontal grouping */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
              <div className="md:col-span-1 lg:col-span-3">
                <SectionReveal id="produtos">
                  <ProductsSection />
                </SectionReveal>
              </div>
              <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-4">
                <SectionReveal id="servico">
                  <SecondaryLinks />
                </SectionReveal>
                <SectionReveal id="conteudo">
                  <ChannelsSection />
                </SectionReveal>
              </div>
            </div>

            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;
