import { handleTrackedClick } from "@/lib/tracking";
import { ArrowRight, Zap, Package } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
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

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

/* ── Shimmer badge for "Em breve" ─────────────────────────────────── */
const ShimmerBadge = ({ label }: { label: string }) => (
  <span className="relative text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none overflow-hidden">
    {label}
    <span
      className="absolute inset-0 rounded-full pointer-events-none shimmer-sweep"
      aria-hidden="true"
    />
  </span>
);

/* ── Product Card ─────────────────────────────────────────────────── */
const ProductCard = ({
  title,
  subtitle,
  badge,
  icon,
  fallbackIcon,
  href,
  trackName,
  accentColor,
  isSpotlit,
  onHover,
  onBlur,
}: ProductCardProps & {
  isSpotlit: boolean;
  onHover: () => void;
  onBlur: () => void;
}) => (
  <button
    onClick={() => handleTrackedClick(href, trackName, "produto")}
    onMouseEnter={onHover}
    onFocus={onHover}
    onMouseLeave={onBlur}
    onBlur={onBlur}
    className={`
      group relative flex items-center justify-between w-full p-4 sm:p-5 rounded-2xl border
      transition-all duration-500 ease-out overflow-hidden text-left
      hover:-translate-y-1
      min-w-[85vw] md:min-w-0 snap-center shrink-0 md:shrink md:snap-align-none
      ${
        isSpotlit
          ? "border-primary/30 shadow-[0_0_20px_-6px_hsl(168_100%_33%/0.18)]"
          : "border-border/50 hover:border-primary/25 hover:shadow-[0_8px_30px_-10px_hsl(168_100%_33%/0.15)]"
      }
    `}
    style={{
      background: `linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))`,
    }}
  >
    {/* Radial hover glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at 20% 50%, ${accentColor}15, transparent 70%)`,
      }}
    />

    {/* Spotlight pulse overlay */}
    {isSpotlit && (
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${accentColor}08, transparent 70%)`,
        }}
      />
    )}

    <div className="flex items-center gap-4 relative z-10 transition-transform duration-300 group-hover:translate-x-2">
      <div
        className={`
          flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl shrink-0
          transition-all duration-300 group-hover:scale-110 overflow-visible p-2
          ${isSpotlit ? "scale-105" : ""}
        `}
        style={{
          border: `1px solid ${accentColor}${isSpotlit ? "40" : "25"}`,
          background: `hsl(var(--secondary) / 0.5)`,
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl leading-tight font-bold text-link-text">
            {title}
          </span>
          {badge &&
            (badge.toLowerCase().includes("breve") ? (
              <ShimmerBadge label={badge} />
            ) : (
              <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">
                {badge}
              </span>
            ))}
        </div>
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
          {subtitle}
        </span>
      </div>
    </div>

    <ArrowRight
      size={20}
      className="relative z-10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 shrink-0 ml-4"
      style={{ color: accentColor }}
    />
  </button>
);

/* ── Dots indicator (mobile) ──────────────────────────────────────── */
const Dots = ({
  count,
  active,
  onDot,
}: {
  count: number;
  active: number;
  onDot: (i: number) => void;
}) => (
  <div className="flex md:hidden justify-center gap-2 mt-3" role="tablist">
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        role="tab"
        aria-selected={i === active}
        onClick={() => onDot(i)}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          i === active
            ? "w-5 bg-primary"
            : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
        }`}
      />
    ))}
  </div>
);

/* ── Section ──────────────────────────────────────────────────────── */
const ProductsSection = () => {
  const reducedMotion = useReducedMotion();
  const SPOTLIGHT_INTERVAL = 5000;
  const AUTOPLAY_INTERVAL = 9000;

  // Spotlight cycling (desktop)
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = setInterval(
      () => setSpotlightIdx((prev) => (prev + 1) % 3),
      SPOTLIGHT_INTERVAL
    );
    return () => clearInterval(id);
  }, [reducedMotion, paused]);

  // Mobile carousel
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const userInteracted = useRef(false);

  const scrollToSlide = useCallback((i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (child) {
      el.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
    }
  }, []);

  // Observe scroll position for active dot
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const scrollCenter = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      children.forEach((child, i) => {
        const center = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(center - scrollCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveSlide(closest);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Mark user interaction on touch/pointer
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const mark = () => {
      userInteracted.current = true;
    };
    el.addEventListener("touchstart", mark, { passive: true, once: true });
    el.addEventListener("pointerdown", mark, { passive: true, once: true });
    return () => {
      el.removeEventListener("touchstart", mark);
      el.removeEventListener("pointerdown", mark);
    };
  }, []);

  // Mobile autoplay (very slow, stops after interaction)
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      if (userInteracted.current) return;
      setActiveSlide((prev) => {
        const next = (prev + 1) % 3;
        scrollToSlide(next);
        return next;
      });
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [reducedMotion, scrollToSlide]);

  const products: ProductCardProps[] = [
    {
      title: "Minimal Pro",
      subtitle:
        "Mentoria 1 a 1 para gestores de tráfego e players do mercado digital",
      icon: (
        <LogoImage
          src={minimalProLogo}
          alt="Minimal Pro"
          fallback={<Package size={24} className="text-primary" />}
        />
      ),
      fallbackIcon: <Package size={24} className="text-primary" />,
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20ser%20mentorado%20da%20Minimal%20PRO.",
      trackName: "minimal_pro",
      accentColor: "#00A98F",
    },
    {
      title: "Minimal Academy",
      subtitle:
        "Tráfego pago, negócios digitais e networking em um só lugar",
      icon: (
        <LogoImage
          src={minimalAcademyLogo}
          alt="Minimal Academy"
          fallback={<Package size={24} className="text-primary" />}
        />
      ),
      fallbackIcon: <Package size={24} className="text-primary" />,
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20ser%20aluno%20da%20Minimal%20Academy.",
      trackName: "minimal_academy",
      accentColor: "#00A98F",
    },
    {
      title: "Minimal CORE.os",
      subtitle:
        "Ferramenta prática com estratégias aplicáveis para gestores de tráfego",
      badge: "Em breve",
      icon: (
        <LogoImage
          src={minimalCoreLogo}
          alt="MinimalCore.os"
          fallback={<Zap size={24} className="text-primary" />}
        />
      ),
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

      {/* Mobile: horizontal snap carousel | Desktop: vertical stack */}
      <div
        ref={scrollRef}
        className="
          flex md:flex-col gap-3
          overflow-x-auto md:overflow-x-visible
          snap-x snap-mandatory md:snap-none
          scrollbar-hide
          px-0 md:px-0
          -mx-1 md:mx-0 pl-1 md:pl-0
        "
      >
        {products.map((p, i) => (
          <ProductCard
            key={p.trackName}
            {...p}
            isSpotlit={!reducedMotion && spotlightIdx === i}
            onHover={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          />
        ))}
      </div>

      <Dots
        count={products.length}
        active={activeSlide}
        onDot={(i) => {
          userInteracted.current = true;
          scrollToSlide(i);
        }}
      />
    </section>
  );
};

export default ProductsSection;
