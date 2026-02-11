import { handleTrackedClick } from "@/lib/tracking";
import { ArrowRight, Youtube, Instagram, MessageCircle, Zap } from "lucide-react";
import minimalAcademyLogo from "@/assets/minimal-academy-logo.png";

interface SecondaryLinkProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  trackName: string;
  trackCategory: string;
}

const SecondaryLink = ({ title, icon, href, trackName, trackCategory }: SecondaryLinkProps) => (
  <button
    onClick={() => handleTrackedClick(href, trackName, trackCategory)}
    className="group flex items-center justify-between w-full px-4 py-3.5 rounded-xl border border-border/40 bg-card/50 text-left transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
  >
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center h-9 w-9 rounded-lg border border-border/30 shrink-0">
        {icon}
      </div>
      <span className="text-sm font-semibold text-foreground">{title}</span>
    </div>
    <ArrowRight
      size={14}
      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
    />
  </button>
);

const SecondaryLinks = () => {
  const links: SecondaryLinkProps[] = [
    {
      title: "Minimal Academy",
      icon: (
        <img
          src={minimalAcademyLogo}
          alt="Minimal Academy"
          className="h-6 w-auto object-contain mix-blend-screen"
        />
      ),
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20ser%20aluno%20da%20Minimal%20Academy.",
      trackName: "minimal_academy",
      trackCategory: "produto",
    },
    {
      title: "App Estratégico",
      icon: <Zap size={18} className="text-amber-400" />,
      href: "#",
      trackName: "app_estrategico",
      trackCategory: "produto",
    },
    {
      title: "Contratar Minimal Marketing",
      icon: <MessageCircle size={18} className="text-primary" />,
      href: "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20me%20tornar%20cliente%20da%20Minimal%20Marketing.",
      trackName: "whatsapp_cta_servico",
      trackCategory: "servico",
    },
    {
      title: "YouTube",
      icon: <Youtube size={18} className="text-red-500" />,
      href: "https://www.youtube.com/@euleonegrao",
      trackName: "youtube",
      trackCategory: "canal",
    },
    {
      title: "Instagram",
      icon: <Instagram size={18} className="text-pink-400" />,
      href: "https://www.instagram.com/euleonegrao/",
      trackName: "instagram",
      trackCategory: "canal",
    },
  ];

  return (
    <section className="flex flex-col gap-2">
      {links.map((link) => (
        <SecondaryLink key={link.trackName} {...link} />
      ))}
    </section>
  );
};

export default SecondaryLinks;
