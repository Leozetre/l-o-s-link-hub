import ProfileHeader from "@/components/ProfileHeader";
import LinksSection from "@/components/LinkButton";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <>
      <ThemeToggle />
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <main className="w-full max-w-[680px]">
          <ProfileHeader />
          <LinksSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
