import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

interface ProofCase {
  segment: string;
  headline: string;
  context: string;
  bullets: [string, string, string];
  whatsappUrl: string;
  thumbnail: string;
}

const cases: ProofCase[] = [
  {
    segment: "Odonto",
    headline: "Do zero à própria clínica em 4 meses",
    context: "Captação para lentes em resina, HOF e preenchimento.",
    bullets: [
      "Começou sem histórico/estrutura de tráfego",
      "Primeiras vendas e agenda ganhando tração",
      "Evolução até abrir a própria clínica (4 meses)",
    ],
    whatsappUrl:
      "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20da%20dentista%20(lentes%2FHOF%2Fpreenchimento).%20Sou%20da%20%C3%A1rea%20de%20Odonto%20e%20quero%20entender%20um%20plano%20de%20capta%C3%A7%C3%A3o%20pro%20meu%20caso.%20Posso%20te%20passar%3A%20cidade%2C%20ticket%20m%C3%A9dio%20e%20meta%20de%20agenda.",
    thumbnail: "/placeholder.svg",
  },
  {
    segment: "Imobiliário",
    headline: "Virada de jogo em 1 ano (VGV)",
    context: "Estrutura de captação, qualificação e rotina.",
    bullets: [
      "Começou do zero no digital",
      "Oferta + criativos + funil de atendimento",
      "Consistência em oportunidades e vendas",
    ],
    whatsappUrl:
      "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20do%20corretor%20(virada%20em%201%20ano).%20Sou%20do%20mercado%20imobili%C3%A1rio%20e%20quero%20estruturar%20meu%20funil%20e%20atendimento.%20Posso%20te%20passar%3A%20regi%C3%A3o%2C%20tipo%20de%20im%C3%B3vel%20e%20meta%20mensal%3F",
    thumbnail: "/placeholder.svg",
  },
  {
    segment: "Varejo",
    headline: "Crescimento + presença online (2+ anos)",
    context: "Tráfego + criativos + constância para varejo.",
    bullets: [
      "Crescimento de vendas e visibilidade",
      "Aprendizado contínuo em criativos e campanhas",
      "Parceria de longo prazo (2+ anos)",
    ],
    whatsappUrl:
      "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20do%20varejo%20de%20cosm%C3%A9ticos%20(crescimento%20e%20presen%C3%A7a%20online).%20Tenho%20uma%20loja%20e%20quero%20melhorar%20tr%C3%A1fego%20e%20const%C3%A2ncia%20de%20vendas.%20Posso%20te%20passar%3A%20cidade%2C%20ticket%20e%20margem%20m%C3%A9dia%3F",
    thumbnail: "/placeholder.svg",
  },
];

const segmentColors: Record<string, string> = {
  Odonto: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Imobiliário: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Varejo: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const ProofSection = () => {
  const [openModal, setOpenModal] = useState<number | null>(null);

  const handleThumbnailClick = (index: number) => {
    const c = cases[index];
    trackEvent({
      event_name: "proof_thumbnail_open",
      button_name: c.headline,
      category: c.segment,
    });
    setOpenModal(index);
  };

  const handleModalCta = (c: ProofCase) => {
    trackEvent({
      event_name: "proof_modal_cta_click",
      button_name: c.headline,
      category: c.segment,
      href: c.whatsappUrl,
    });
    window.open(c.whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="flex flex-col gap-3 mb-8">
      <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1">
        Resultados reais (sem promessa milagrosa)
      </h2>

      <div className="flex flex-col gap-2.5">
        {cases.map((c, i) => (
          <button
            key={c.segment}
            onClick={() => handleThumbnailClick(i)}
            className="flex items-start gap-3 p-3.5 rounded-xl border border-border/40 bg-card/50 text-left transition-all duration-200 hover:border-border/70 hover:bg-card/70 active:scale-[0.99] w-full"
          >
            {/* Thumbnail */}
            <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted/30 border border-border/30">
              <img
                src={c.thumbnail}
                alt={`Print ${c.segment}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1 min-w-0">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border w-fit ${segmentColors[c.segment] || ""}`}
              >
                {c.segment}
              </span>
              <p className="text-sm font-bold text-foreground leading-snug truncate">
                {c.headline}
              </p>
              <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                {c.context}
              </p>
              <span className="text-[10px] text-primary font-semibold mt-0.5">
                Ver print + contexto →
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {openModal !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="relative w-full max-w-md bg-card border border-border rounded-2xl p-5 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Badge + headline */}
            <div className="flex flex-col gap-1.5 pr-8">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border w-fit ${segmentColors[cases[openModal].segment] || ""}`}
              >
                {cases[openModal].segment}
              </span>
              <h3 className="text-lg font-extrabold text-foreground">
                {cases[openModal].headline}
              </h3>
            </div>

            {/* Screenshot */}
            <div className="w-full rounded-xl overflow-hidden border border-border/40 bg-muted/20">
              <img
                src={cases[openModal].thumbnail}
                alt={`Print ${cases[openModal].segment}`}
                className="w-full h-auto"
              />
            </div>

            {/* Bullets */}
            <ul className="flex flex-col gap-2">
              {cases[openModal].bullets.map((b, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-sm text-foreground/90"
                >
                  <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => handleModalCta(cases[openModal])}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, hsl(168 100% 33%), hsl(168 80% 28%))",
                boxShadow: "0 8px 30px -8px hsl(168 100% 33% / 0.4)",
              }}
            >
              <ExternalLink size={16} />
              Falar sobre {cases[openModal].segment} no WhatsApp
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProofSection;
