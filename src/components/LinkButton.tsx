import { ArrowRight, Youtube, Instagram, MessageCircle } from "lucide-react";
import minimalProLogo from "@/assets/minimal-pro-logo.png";
import minimalAcademyLogo from "@/assets/minimal-academy-logo.png";

interface LinkItemProps {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
}

const LinkItem = ({
  href,
  title,
  subtitle,
  icon,
  gradientFrom,
  gradientTo,
  accentColor,
}: LinkItemProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between w-full p-4 sm:p-5 rounded-2xl border border-border/50 transition-all duration-300 hover:border-transparent overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${accentColor}15, transparent 70%)`,
        }}
      />

      <div className="flex items-center gap-4 relative z-10 transition-transform duration-300 group-hover:translate-x-2">
        {/* Icon container */}
        <div
          className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl shrink-0 transition-all duration-300 group-hover:scale-105"
          style={{
            background: 'transparent',
            border: `1px solid ${accentColor}25`,
          }}
        >
          {icon}
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-lg sm:text-xl leading-tight font-bold text-link-text">
            {title}
          </span>
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
    </a>
  );
};

const LinksSection = () => {
  const links: LinkItemProps[] = [
    {
      href: "https://www.youtube.com/@euleonegrao",
      title: "Inscreva-se no YouTube",
      subtitle: "Mercado digital e Tráfego sem filtro",
      icon: <Youtube size={26} className="text-red-500" />,
      gradientFrom: "hsl(0 0% 10%)",
      gradientTo: "hsl(0 10% 9%)",
      accentColor: "#FF0033",
    },
    {
      href: "https://www.instagram.com/euleonegrao/",
      title: "Acompanhe no Instagram",
      subtitle: "Rotina real de quem vive disso",
      icon: <Instagram size={26} className="text-pink-400" />,
      gradientFrom: "hsl(0 0% 10%)",
      gradientTo: "hsl(320 10% 9%)",
      accentColor: "#E1306C",
    },
    {
      href: "https://wa.me/5512997289339?text=Ol%C3%A1!%20Tenho%20interesse%20na%20sua%20assessoria%20de%20marketing.%20Pode%20me%20ajudar%3F",
      title: "Fale comigo no WhatsApp",
      subtitle: "Tenha uma consultoria ou nos contrate",
      icon: <MessageCircle size={26} className="text-green-400" />,
      gradientFrom: "hsl(0 0% 10%)",
      gradientTo: "hsl(140 10% 9%)",
      accentColor: "#25D366",
    },
    {
      href: "https://wa.me/5512997289339?text=Ol%C3%A1!%20Tenho%20interesse%20na%20Mentoria%20Minimal%20Pro.%20Pode%20me%20ajudar%3F",
      title: "Minimal Pro",
      subtitle: "Mentoria 1 a 1 para gestores de tráfego e players do mercado digital",
      icon: (
        <img
          src={minimalProLogo}
          alt="Minimal Pro"
          className="h-10 w-auto max-w-[6rem] object-contain mix-blend-screen"
        />
      ),
      gradientFrom: "hsl(0 0% 10%)",
      gradientTo: "hsl(168 15% 8%)",
      accentColor: "#00A98F",
    },
    {
      href: "https://minimalacademy.vercel.app/",
      title: "Minimal Academy",
      subtitle: "Comunidade de Gestão de Tráfego Pago",
      icon: (
        <img
          src={minimalAcademyLogo}
          alt="Minimal Academy"
          className="h-10 w-auto max-w-[6rem] object-contain mix-blend-screen"
        />
      ),
      gradientFrom: "hsl(0 0% 10%)",
      gradientTo: "hsl(168 15% 8%)",
      accentColor: "#00A98F",
    },
  ];

  return (
    <div className="flex flex-col w-full gap-3">
      {links.map((link) => (
        <LinkItem key={link.title} {...link} />
      ))}
    </div>
  );
};

export default LinksSection;
