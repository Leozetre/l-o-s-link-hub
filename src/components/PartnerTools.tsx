import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

const LAUNCH_AFF_URL = "https://LAUNCH_AFF_URL";
const METRIFIQUEI_AFF_URL = "https://METRIFIQUEI_AFF_URL";

interface Partner {
  name: string;
  description: string;
  url: string;
}

const partners: Partner[] = [
  {
    name: "Launch",
    description: "Multi-login para players do digital e times.",
    url: LAUNCH_AFF_URL,
  },
  {
    name: "Metrifiquei",
    description: "Relatórios e dashboards para acompanhar performance.",
    url: METRIFIQUEI_AFF_URL,
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
          className="flex flex-col items-start gap-1.5 rounded-xl border border-border bg-card p-4 text-left transition-shadow hover:shadow-md"
        >
          <span className="text-sm font-semibold text-card-foreground">
            {p.name}
          </span>
          <span className="text-xs text-muted-foreground leading-snug">
            {p.description}
          </span>
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary">
            Acessar com meu link
            <ExternalLink className="h-3 w-3" />
          </span>
        </button>
      ))}
    </div>

    <p className="mt-2 text-[10px] text-muted-foreground/60 text-center">
      Link de parceiro.
    </p>
  </section>
);

export default PartnerTools;
