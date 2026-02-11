import { useEffect } from "react";
import HeroCTA from "@/components/HeroCTA";
import SocialProof from "@/components/SocialProof";
import ProofSection from "@/components/ProofSection";
import NicheCases from "@/components/NicheCases";
import SecondaryLinks from "@/components/SecondaryLinks";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { trackPageView } from "@/lib/tracking";

const Index = () => {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <>
      <ThemeToggle />
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <main className="w-full max-w-[480px]">
          <HeroCTA />
          <SocialProof />
          <ProofSection />
          <NicheCases />
          <SecondaryLinks />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
