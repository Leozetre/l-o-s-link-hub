import LinksSection from "@/components/LinkButton";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <>
      <ThemeToggle />
      <div className="h-screen flex items-center justify-center px-4">
        <main className="w-full max-w-[680px]">
          <LinksSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
