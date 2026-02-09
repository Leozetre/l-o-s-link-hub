import { ArrowRight } from "lucide-react";

interface LinkItemProps {
  href: string;
  title: string;
  subtitle: string;
}

const LinkItem = ({ href, title, subtitle }: LinkItemProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between w-full py-8 border-b border-link-border transition-all duration-300 hover:border-primary"
    >
      <div className="flex flex-col gap-1 transition-transform duration-300 group-hover:translate-x-3">
        <span className="text-[2.5rem] leading-tight font-bold text-link-text">
          {title}
        </span>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>
      <ArrowRight
        size={28}
        className="text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 shrink-0 ml-4"
      />
    </a>
  );
};

const LinksSection = () => {
  const links: LinkItemProps[] = [
    {
      href: "https://www.instagram.com/euleonegrao/",
      title: "Acompanhe minha jornada",
      subtitle: "Bastidores",
    },
    {
      href: "https://wa.me/5512997289339?text=Olá",
      title: "Contrate minha assessoria",
      subtitle: "Minimal Marketing",
    },
    {
      href: "https://wa.me/5512997289339?text=Olá",
      title: "Acompanhamento Individual",
      subtitle: "Minimal Pro",
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
