import { Instagram, MessageCircle, Star } from "lucide-react";

interface LinkButtonProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const LinkButton = ({ href, label, icon }: LinkButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 w-full px-6 py-4 rounded-lg bg-link border border-link-border text-link-text font-medium text-sm transition-all duration-300 hover:border-primary hover:shadow-[var(--link-hover-shadow)] hover:-translate-y-0.5"
    >
      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      <svg
        className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
};

const LinksSection = () => {
  const links = [
    {
      href: "https://www.instagram.com/euleonegrao/",
      label: "Acompanhe minha jornada — Bastidores",
      icon: <Instagram size={20} />,
    },
    {
      href: "https://wa.me/5512997289339?text=Olá",
      label: "Contrate minha assessoria — Minimal Marketing",
      icon: <MessageCircle size={20} />,
    },
    {
      href: "https://wa.me/5512997289339?text=Olá",
      label: "Minimal Pro — Acompanhamento Individual",
      icon: <Star size={20} />,
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {links.map((link) => (
        <LinkButton key={link.label} {...link} />
      ))}
    </div>
  );
};

export default LinksSection;
