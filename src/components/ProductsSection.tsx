import { handleTrackedClick } from "@/lib/tracking";
import { ArrowRight, Zap } from "lucide-react";
import minimalProLogo from "@/assets/minimal-pro-logo.png";
import minimalAcademyLogo from "@/assets/minimal-academy-logo.png";

interface ProductCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  trackName: string;
  accentColor: string;
}

const ProductCard = ({ title, subtitle, icon, href, trackName, accentColor }: ProductCardProps) => (
  <button
    onClick={() => handleTrackedClick(href, trackName, "produto")}
    className="group relative flex items-center justify-between w-full p-4 sm:p-5 rounded-2xl border border-border/50 transition-all duration-300 hover:border-transparent overflow-hidden text-left"
    style={{
      background: `linear-gradient(135deg, hsl(0 0% 10%), hsl(168 10% 8%))`,
    }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
      style={{ background: `radial-gradient(ellipse at 20% 50%, ${accentColor}15, transparent 70%)` }}
    />

    <div className="flex items-center gap-4 relative z-10 transition-transform duration-300 group-hover:translate-x-2">
      <div
        className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl shrink-0 transition-all duration-300 group-hover:scale-105"
        style={{ border: `1px solid ${accentColor}25` }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-lg sm:text-xl leading-tight font-bold text-link-text">{title}</span>
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">{subtitle}</span>
      </div>
    </div>

    <ArrowRight
      size={20}
      className="relative z-10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 shrink-0 ml-4"
      style={{ color: accentColor }}
    />
  </button>
);

const ProductsSection = () => {
  const products: ProductCardProps[] = [
    {
      title: "Minimal Pro",
      subtitle: "Mentoria 1 a 1 para gestores de tráfego e players do mercado digital",
      icon: (
        <img src={minimalProLogo} alt="Minimal Pro" className="h-10 w-auto max-w-[6rem] object-contain mix-blend-screen" />
      ),
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20ser%20mentorado%20da%20Minimal%20PRO.",
      trackName: "minimal_pro",
      accentColor: "#00A98F",
    },
    {
      title: "Minimal Academy",
      subtitle: "Tráfego pago, negócios digitais e networking em um só lugar",
      icon: (
        <img src={minimalAcademyLogo} alt="Minimal Academy" className="h-10 w-auto max-w-[6rem] object-contain mix-blend-screen" />
      ),
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20ser%20aluno%20da%20Minimal%20Academy.",
      trackName: "minimal_academy",
      accentColor: "#00A98F",
    },
    {
      title: "App Estratégico",
      subtitle: "Ferramenta prática com estratégias aplicáveis para gestores de tráfego",
      icon: <Zap size={26} className="text-amber-400" />,
      href: "#", // Placeholder — user will provide URL
      trackName: "app_estrategico",
      accentColor: "#F59E0B",
    },
  ];

  return (
    <section className="flex flex-col gap-3 mb-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1 mb-1">
        Produtos
      </h2>
      {products.map((p) => (
        <ProductCard key={p.trackName} {...p} />
      ))}
    </section>
  );
};

export default ProductsSection;
