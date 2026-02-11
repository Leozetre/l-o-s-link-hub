import HeroCTA from "@/components/HeroCTA";
import ProductsSection from "@/components/ProductsSection";
import ChannelsSection from "@/components/ChannelsSection";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <>
      <ThemeToggle />
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <main className="w-full max-w-[680px]">
          <HeroCTA />
          <ProductsSection />
          <ChannelsSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
