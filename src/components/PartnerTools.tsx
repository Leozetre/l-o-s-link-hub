import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import lauthLogo from "@/assets/partner-lauth.png";
import metrifiqueiLogo from "@/assets/partner-metrifiquei.png";

const LAUTH_AFF_URL = "https://LAUTH_AFF_URL";
const METRIFIQUEI_AFF_URL = "https://METRIFIQUEI_AFF_URL";

interface Partner {
  name: string;
  description: string;
  url: string;
  logo: string;
}

const partners: Partner[] = [
  {
    name: "Lauth",
    description: "Multi-login para players do digital e times.",
    url: LAUTH_AFF_URL,
    logo: lauthLogo,
  },
  {
    name: "Metrifiquei",
    description: "Relatórios e dashboards para acompanhar performance.",
    url: METRIFIQUEI_AFF_URL,
    logo: metrifiqueiLogo,
  },
];

const handlePartnerClick = (partner: Partner) => {
  trackEvent({
    event_name: "partner_click",
    button_name: partner.name,
    category: "parceiro",
    href: partner.url,
  });

  const a = document.createElement("a");
  a.href = partner.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const PartnerTools = () => (
  <section className="mt-10">
    <h2 className="text-lg font-semibold text-muted-foreground mb-4">
      Ferramentas <span className="font-normal">(parcerias)</span>
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {partners.map((p) => (
        <button
          key={p.name}
          onClick={() => handlePartnerClick(p)}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-shadow hover:shadow-md"
        >
          <img
            src={p.logo}
            alt={`${p.name} logo`}
            className="h-10 w-10 rounded-lg object-contain"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-card-foreground">
              {p.name}
            </span>
            <span className="text-xs text-muted-foreground leading-snug">
              {p.description}
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Acessar com meu link
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </button>
      ))}
    </div>
  </section>
);

export default PartnerTools;
