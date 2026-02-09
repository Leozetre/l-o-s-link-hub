import { ArrowRight } from "lucide-react";
import minimalMarketingLogo from "@/assets/minimal-marketing-logo.png";
import minimalProLogo from "@/assets/minimal-pro-logo.png";
import minimalAcademyLogo from "@/assets/minimal-academy-logo.png";

interface LinkItemProps {
  href: string;
  title: string;
  subtitle: string;
  logo: string;
  logoAlt: string;
}

const LinkItem = ({ href, title, subtitle, logo, logoAlt }: LinkItemProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between w-full py-6 border-b border-link-border transition-all duration-300 hover:border-primary"
    >
      <div className="flex items-center gap-4 transition-transform duration-300 group-hover:translate-x-3">
        <img
          src={logo}
          alt={logoAlt}
          className="h-10 w-10 object-contain shrink-0"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-xl sm:text-2xl leading-tight font-bold text-link-text">
            {title}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">{subtitle}</span>
        </div>
      </div>
      <ArrowRight
        size={24}
        className="text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 shrink-0 ml-4"
      />
    </a>
  );
};

const LinksSection = () => {
  const links: LinkItemProps[] = [
    {
      href: "https://www.youtube.com/@euleonegrao",
      title: "Inscreva-se no canal",
      subtitle: "Conteúdo no YouTube",
      logo: minimalMarketingLogo,
      logoAlt: "Minimal Marketing",
    },
    {
      href: "https://www.instagram.com/euleonegrao/",
      title: "Acompanhe minha jornada",
      subtitle: "Bastidores no Instagram",
      logo: minimalMarketingLogo,
      logoAlt: "Minimal Marketing",
    },
    {
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20me%20tornar%20cliente%20da%20Minimal%20Marketing.",
      title: "Contrate minha assessoria",
      subtitle: "Gestão de tráfego para o seu negócio",
      logo: minimalMarketingLogo,
      logoAlt: "Minimal Marketing",
    },
    {
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20ser%20mentorado%20da%20Minimal%20PRO.",
      title: "Minimal Pro",
      subtitle: "Mentoria individual para gestores de tráfego",
      logo: minimalProLogo,
      logoAlt: "Minimal Pro",
    },
    {
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20ser%20aluno%20da%20Minimal%20Academy.",
      title: "Minimal Academy",
      subtitle: "Comunidade de gestão de tráfego e negócios locais",
      logo: minimalAcademyLogo,
      logoAlt: "Minimal Academy",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {links.map((link) => (
        <LinkItem key={link.title} {...link} />
      ))}
    </div>
  );
};

export default LinksSection;
