import { handleTrackedClick } from "@/lib/tracking";
import { ArrowRight, Zap, Package } from "lucide-react";
import { useState } from "react";
import minimalProLogo from "@/assets/minimal-pro-logo.png";
import minimalAcademyLogo from "@/assets/minimal-academy-logo.png";
import minimalCoreLogo from "@/assets/minimal-core-logo.png";

interface ProductCardProps {
  title: string;
  subtitle: string;
  badge?: string;
  icon: React.ReactNode;
  fallbackIcon: React.ReactNode;
  href: string;
  trackName: string;
  accentColor: string;
}

const LogoImage = ({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: React.ReactNode;
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-contain"
    />
  );
};

const ProductCard = ({ title, subtitle, badge, icon, fallbackIcon, href, trackName, accentColor }: ProductCardProps) => (
  <button
    onClick={() => handleTrackedClick(href, trackName, "produto")}
    className="group relative flex items-center justify-between w-full p-4 sm:p-5 rounded-2xl border border-border/50 transition-all duration-300 hover:border-transparent overflow-hidden text-left"
    style={{
      background: `linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))`,
    }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
      style={{ background: `radial-gradient(ellipse at 20% 50%, ${accentColor}15, transparent 70%)` }}
    />

    <div className="flex items-center gap-4 relative z-10 transition-transform duration-300 group-hover:translate-x-2">
      <div
        className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl shrink-0 transition-all duration-300 group-hover:scale-105 overflow-visible p-2"
        style={{
          border: `1px solid ${accentColor}25`,
          background: `hsl(var(--secondary) / 0.5)`,
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl leading-tight font-bold text-link-text">{title}</span>
          {badge && (
            <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">
              {badge}
            </span>
          )}
        </div>
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
      icon: <LogoImage src={minimalProLogo} alt="Minimal Pro" fallback={<Package size={24} className="text-primary" />} />,
      fallbackIcon: <Package size={24} className="text-primary" />,
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20ser%20mentorado%20da%20Minimal%20PRO.",
      trackName: "minimal_pro",
      accentColor: "#00A98F",
    },
    {
      title: "Minimal Academy",
      subtitle: "Tráfego pago, negócios digitais e networking em um só lugar",
      icon: <LogoImage src={minimalAcademyLogo} alt="Minimal Academy" fallback={<Package size={24} className="text-primary" />} />,
      fallbackIcon: <Package size={24} className="text-primary" />,
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20ser%20aluno%20da%20Minimal%20Academy.",
      trackName: "minimal_academy",
      accentColor: "#00A98F",
    },
    {
      title: "Minimal CORE.os",
      subtitle: "Ferramenta prática com estratégias aplicáveis para gestores de tráfego",
      badge: "Em breve",
      icon: <LogoImage src={minimalCoreLogo} alt="MinimalCore.os" fallback={<Zap size={24} className="text-primary" />} />,
      fallbackIcon: <Zap size={24} className="text-primary" />,
      href: "#",
      trackName: "minimal_core",
      accentColor: "#00A98F",
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
