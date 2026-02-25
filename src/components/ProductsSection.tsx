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
  href: string;
  trackName: string;
  accentColor: string;
}

const LogoImage = ({ src, alt, fallback }: { src: string; alt: string; fallback: React.ReactNode }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <img src={src} alt={alt} onError={() => setFailed(true)} className="h-full w-full object-contain" />;
};

const ShimmerBadge = ({ label }: { label: string }) => (
  <span className="relative text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none overflow-hidden">
    {label}
    <span className="absolute inset-0 rounded-full pointer-events-none shimmer-sweep" aria-hidden="true" />
  </span>
);

const ProductCard = ({ title, subtitle, badge, icon, href, trackName, accentColor }: ProductCardProps) => (
  <button
    onClick={() => handleTrackedClick(href, trackName, "produto")}
    className="group relative flex items-center justify-between w-full p-4 sm:p-5 rounded-2xl border border-border/50 transition-all duration-300 ease-out overflow-hidden text-left hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_8px_30px_-10px_hsl(168_100%_33%/0.15)]"
    style={{ background: `linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))` }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
      style={{ background: `radial-gradient(ellipse at 20% 50%, ${accentColor}15, transparent 70%)` }}
    />

    <div className="flex items-center gap-4 relative z-10 transition-transform duration-300 group-hover:translate-x-2">
      <div
        className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl shrink-0 transition-all duration-300 group-hover:scale-110 overflow-visible p-2"
        style={{ border: `1px solid ${accentColor}25`, background: `hsl(var(--secondary) / 0.5)` }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl leading-tight font-bold text-link-text">{title}</span>
          {badge && (badge.toLowerCase().includes("breve") ? <ShimmerBadge label={badge} /> : (
            <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">{badge}</span>
          ))}
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

const products: ProductCardProps[] = [
  {
    title: "Minimal Pro",
    subtitle: "Mentoria 1 a 1 para gestores de tráfego e players do mercado digital",
    icon: <LogoImage src={minimalProLogo} alt="Minimal Pro" fallback={<Package size={24} className="text-primary" />} />,
    href: "https://wa.me/5512997289339?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20a%20Mentoria%20Minimal%20Pro.%20Pode%20me%20ajudar%3F",
    trackName: "minimal_pro",
    accentColor: "#00A98F",
  },
  {
    title: "Minimal Academy",
    subtitle: "Tráfego pago, negócios digitais e networking em um só lugar",
    icon: <LogoImage src={minimalAcademyLogo} alt="Minimal Academy" fallback={<Package size={24} className="text-primary" />} />,
    href: "https://minimalacademy.vercel.app/",
    trackName: "minimal_academy",
    accentColor: "#00A98F",
  },
  {
    title: "Minimal CORE.os",
    subtitle: "Ferramenta prática com estratégias aplicáveis para gestores de tráfego",
    badge: "Lançamento",
    icon: <LogoImage src={minimalCoreLogo} alt="MinimalCore.os" fallback={<Zap size={24} className="text-primary" />} />,
    href: "https://minimalcore.vercel.app/",
    trackName: "minimal_core",
    accentColor: "#00A98F",
  },
];

const ProductsSection = () => (
  <section className="flex flex-col gap-3 mb-6">
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1 mb-1">Produtos</h2>
    <div className="flex flex-col gap-3">
      {products.map((p) => <ProductCard key={p.trackName} {...p} />)}
    </div>
  </section>
);

export default ProductsSection;
