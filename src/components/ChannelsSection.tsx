import { handleTrackedClick } from "@/lib/tracking";
import { ArrowRight, Youtube, Instagram } from "lucide-react";

interface ChannelLinkProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  trackName: string;
  accentColor: string;
  gradientTo: string;
}

const ChannelLink = ({ title, subtitle, icon, href, trackName, accentColor, gradientTo }: ChannelLinkProps) => (
  <button
    onClick={() => handleTrackedClick(href, trackName, "canal")}
    className="group relative flex items-center justify-between w-full p-4 rounded-2xl border border-border/50 transition-all duration-300 hover:border-transparent overflow-hidden text-left"
    style={{ background: `linear-gradient(135deg, hsl(0 0% 10%), ${gradientTo})` }}
  >
    <div className="flex items-center gap-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1">
      <div className="flex items-center justify-center h-10 w-10 rounded-lg shrink-0" style={{ border: `1px solid ${accentColor}25` }}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold text-link-text">{title}</span>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </div>
    <ArrowRight
      size={16}
      className="relative z-10 opacity-0 transition-all duration-300 group-hover:opacity-100 shrink-0 ml-3"
      style={{ color: accentColor }}
    />
  </button>
);

const ChannelsSection = () => {
  const channels: ChannelLinkProps[] = [
    {
      title: "Inscreva-se no YouTube",
      subtitle: "Mercado digital e Tráfego sem filtro",
      icon: <Youtube size={22} className="text-red-500" />,
      href: "https://www.youtube.com/@euleonegrao",
      trackName: "youtube",
      accentColor: "#FF0033",
      gradientTo: "hsl(0 10% 9%)",
    },
    {
      title: "Acompanhe no Instagram",
      subtitle: "Rotina real de quem vive disso",
      icon: <Instagram size={22} className="text-pink-400" />,
      href: "https://www.instagram.com/euleonegrao/",
      trackName: "instagram",
      accentColor: "#E1306C",
      gradientTo: "hsl(320 10% 9%)",
    },
  ];

  return (
    <section className="flex flex-col gap-3 mb-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1 mb-1">
        Canais
      </h2>
      {channels.map((c) => (
        <ChannelLink key={c.trackName} {...c} />
      ))}
    </section>
  );
};

export default ChannelsSection;
