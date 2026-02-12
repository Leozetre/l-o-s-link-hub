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

      <div className="min-h-screen px-4 py-12">
        {/* Desktop: 2-col | Mobile: single col */}
        <div className="mx-auto max-w-6xl lg:flex lg:gap-12">
          {/* Left column — sticky on desktop, normal on mobile */}
          <aside className="lg:w-[340px] lg:shrink-0 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto scrollbar-hide">
            {/* Show StickyProfile on desktop, HeroCTA on mobile */}
            <div className="hidden lg:block">
              <StickyProfile />
            </div>
            <div className="lg:hidden">
              <HeroCTA />
            </div>
          </aside>

          {/* Right column — scrollable content */}
           <main className="flex-1 max-w-[560px] lg:max-w-none mt-6 lg:mt-0 mx-auto lg:mx-0">
            <DesktopNav />

            {/* Row 1: Social proof + Niche cases side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <SectionReveal>
                <SocialProof />
              </SectionReveal>
              <SectionReveal id="cases">
                <NicheCases />
              </SectionReveal>
            </div>

            <SectionReveal>
              <ProofSection />
            </SectionReveal>

            {/* Row 2: Products + Channels/Service side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
              <div className="lg:col-span-3">
                <SectionReveal id="produtos">
                  <ProductsSection />
                </SectionReveal>
              </div>
              <div className="lg:col-span-2 flex flex-col gap-4">
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
