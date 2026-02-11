import { useState } from "react";
import { ChevronDown, ExternalLink, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
      "Evolução até abrir a própria clínica",
    ],
    whatsappUrl:
      "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20da%20dentista%20(lentes%2FHOF%2Fpreenchimento).%20Quero%20um%20plano%20de%20capta%C3%A7%C3%A3o%20pro%20meu%20caso.%20Minha%20cidade%20%C3%A9%3A%20__.%20Meu%20ticket%20m%C3%A9dio%20%C3%A9%3A%20__.%20Minha%20meta%20de%20agenda%20%C3%A9%3A%20__.",
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
      "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20do%20corretor%20(virada%20em%201%20ano).%20Quero%20estruturar%20meu%20funil.%20Regi%C3%A3o%3A%20__.%20Tipo%20de%20im%C3%B3vel%3A%20__.%20Meta%20mensal%3A%20__.",
    thumbnail: "/placeholder.svg",
  },
  {
    segment: "Varejo",
    headline: "Crescimento + presença online (2+ anos)",
    context: "Tráfego + criativos + constância para varejo.",
    bullets: [
      "Crescimento de vendas e visibilidade",
      "Rotina de criativos e campanhas",
      "Parceria de longo prazo (2+ anos)",
    ],
    whatsappUrl:
      "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20do%20varejo%20de%20cosm%C3%A9ticos.%20Quero%20melhorar%20tr%C3%A1fego%20e%20const%C3%A2ncia%20de%20vendas.%20Cidade%3A%20__.%20Ticket%3A%20__.%20Margem%20m%C3%A9dia%3A%20__.",
    thumbnail: "/placeholder.svg",
  },
];

const segmentColors: Record<string, string> = {
  Odonto: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Imobiliário: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Varejo: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const ProofSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    if (openIndex === i) {
      setOpenIndex(null);
    } else {
      trackEvent({
        event_name: "proof_accordion_open",
        button_name: cases[i].headline,
        category: cases[i].segment,
      });
      setOpenIndex(i);
    }
  };

  const handleZoom = (i: number) => {
    trackEvent({
      event_name: "proof_screenshot_zoom",
      button_name: cases[i].headline,
      category: cases[i].segment,
    });
    setZoomedIndex(i);
  };

  const handleCta = (c: ProofCase) => {
    trackEvent({
      event_name: "proof_modal_cta_click",
      button_name: c.headline,
      category: c.segment,
      href: c.whatsappUrl,
    });
    window.open(c.whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="resultados" className="flex flex-col gap-3 mb-8">
      <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1">
        Resultados reais (sem promessa milagrosa)
      </h2>

      <div className="flex flex-col gap-2.5">
        {cases.map((c, i) => (
          <div
            key={c.segment}
            className="rounded-xl border border-border/40 bg-card/50 overflow-hidden transition-colors duration-200 hover:border-border/60"
          >
            {/* Trigger */}
            <button
              onClick={() => toggle(i)}
              className="flex items-center gap-3 p-3.5 w-full text-left"
            >
              <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-muted/30 border border-border/30">
                <img
                  src={c.thumbnail}
                  alt={`Print ${c.segment}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border w-fit ${segmentColors[c.segment] || ""}`}
                >
                  {c.segment}
                </span>
                <p className="text-sm font-bold text-foreground leading-snug truncate">
                  {c.headline}
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1">
                  {c.context}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Expandable content */}
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-3.5 pb-4 flex flex-col gap-3">
                    {/* Inline screenshot */}
                    <div className="relative group">
                      <div className="w-full rounded-xl overflow-hidden border border-border/40 bg-muted/20">
                        <img
                          src={c.thumbnail}
                          alt={`Screenshot ${c.segment}`}
                          loading="lazy"
                          className="w-full h-auto"
                        />
                      </div>
                      <button
                        onClick={() => handleZoom(i)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/70 backdrop-blur-sm border border-border/30 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ZoomIn size={14} />
                      </button>
                    </div>

                    {/* Bullets */}
                    <ul className="flex flex-col gap-1.5">
                      {c.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-[13px] text-foreground/90"
                        >
                          <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => handleCta(c)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(168 100% 33%), hsl(168 80% 28%))",
                        boxShadow: "0 6px 24px -6px hsl(168 100% 33% / 0.35)",
                      }}
                    >
                      <ExternalLink size={14} />
                      Quero um plano pro meu caso
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {zoomedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setZoomedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomedIndex(null)}
                className="absolute -top-10 right-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
              <img
                src={cases[zoomedIndex].thumbnail}
                alt={`Screenshot ${cases[zoomedIndex].segment}`}
                className="w-full h-auto rounded-2xl border border-border/40"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProofSection;
