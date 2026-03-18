import { Youtube, Instagram } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

const socials = [
  {
    platform: "youtube" as const,
    label: "YouTube",
    href: "https://www.youtube.com/@euleonegrao",
    icon: Youtube,
    color: "text-red-500",
    glowColor: "hover:shadow-[0_0_12px_hsl(0_80%_50%/0.3)]",
  },
  {
    platform: "instagram" as const,
    label: "Instagram",
    href: "https://www.instagram.com/euleonegrao/",
    icon: Instagram,
    color: "text-pink-400",
    glowColor: "hover:shadow-[0_0_12px_hsl(330_80%_55%/0.3)]",
  },
];

const SocialIcons = () => {
  const handleClick = (platform: string, href: string) => {
    trackEvent({
      event_name: "content_click",
      button_name: platform,
      category: "top_icons",
      href,
    });
    const a = document.createElement("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {socials.map(({ platform, label, href, icon: Icon, color, glowColor }) => (
        <button
          key={platform}
          onClick={() => handleClick(platform, href)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 bg-card/50 backdrop-blur-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 ${glowColor} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40`}
        >
          <Icon size={16} className={color} />
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default SocialIcons;
