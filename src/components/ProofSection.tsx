import { useState } from "react";
import { ChevronDown, ExternalLink, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/tracking";

interface ProofCase {
  id: string;
  segment: string;
  headline: string;
  context: string;
  bullets: [string, string, string];
  ctaLabel: string;
  whatsappUrl: string;
  thumbnail: string;
}

const cases: ProofCase[] = [
  {
    id: "odonto-acessivel",
    segment: "Odonto",
    headline: "Odonto acessível: volume com eficiência",
    context: "Mensagens e captação com custo competitivo.",
    bullets: [
      "Estrutura simples e repetível de captação",
      "Otimização por custo por conversa",
      "Consistência de volume e alcance",
    ],
    ctaLabel: "Quero um plano para minha clínica",
    whatsappUrl:
      "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20de%20Odonto%20(cl%C3%ADnica%20acess%C3%ADvel).%20Quero%20estruturar%20capta%C3%A7%C3%A3o%20por%20WhatsApp.%20Cidade%3A%20__.%20Procedimento%20foco%3A%20__.%20Meta%20de%20agenda%3A%20__.",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "odonto-premium",
    segment: "Odonto",
    headline: "Odonto premium: demanda qualificada",
    context: "Criativos + mensagens para ticket maior.",
    bullets: [
      "Oferta e criativos com filtro de perfil",
      "Qualidade acima de volume",
      "Rotina de testes e otimização",
    ],
    ctaLabel: "Quero atrair pacientes premium",
    whatsappUrl:
      "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20de%20Odonto%20premium.%20Quero%20atrair%20pacientes%20mais%20qualificados.%20Cidade%3A%20__.%20Ticket%20m%C3%A9dio%3A%20__.%20Procedimento%20foco%3A%20__.",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "odonto-zero",
    segment: "Odonto",
    headline: "Do zero à própria clínica em 4 meses",
    context: "Lentes em resina, HOF e preenchimento.",
    bullets: [
      "Começou sem histórico/estrutura de tráfego",
      "Primeiras vendas e agenda ganhando tração",
      "Evolução até abrir a própria clínica",
    ],
    ctaLabel: "Quero um plano pro meu caso",
    whatsappUrl:
      "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20da%20dentista%20(lentes%2FHOF%2Fpreenchimento).%20Quero%20um%20plano%20de%20capta%C3%A7%C3%A3o%20pro%20meu%20caso.%20Cidade%3A%20__.%20Ticket%3A%20__.%20Meta%20de%20agenda%3A%20__.",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "imobiliario",
    segment: "Imobiliário",
    headline: "Virada em 1 ano: vendas e VGV",
    context: "Captação, qualificação e rotina comercial.",
    bullets: [
      "Começou do zero no digital",
      "Oferta + criativos + funil de atendimento",
      "Consistência em oportunidades e vendas",
    ],
    ctaLabel: "Quero estruturar meu funil",
    whatsappUrl:
      "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20do%20corretor%20(virada%20em%201%20ano).%20Quero%20estruturar%20meu%20funil.%20Regi%C3%A3o%3A%20__.%20Tipo%20de%20im%C3%B3vel%3A%20__.%20Meta%20mensal%3A%20__.",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "varejo",
    segment: "Varejo",
    headline: "Crescimento contínuo (2+ anos)",
    context: "Tráfego + criativos + constância.",
    bullets: [
      "Crescimento de vendas e visibilidade",
      "Rotina de criativos e campanhas",
      "Parceria de longo prazo",
    ],
    ctaLabel: "Quero escalar com consistência",
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
      event_name: "screenshot_zoom",
      button_name: cases[i].id,
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
    <section id="resultados" className="flex flex-col gap-5 mb-8">
      <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1">
        Resultados reais (sem promessa milagrosa)
      </h2>

      {/* Timeline container */}
      <div className="relative">
        {/* Vertical timeline line — visible on mobile, hidden on desktop 2-col */}
        <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent lg:hidden" />

        {/* Desktop: masonry-like 2-col with its own timeline per column */}
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
          {cases.map((c, i) => (
            <div key={c.id} className="relative pl-8 lg:pl-0">
              {/* Timeline node — mobile only */}
              <div
                className={`lg:hidden absolute left-0 top-4 h-[22px] w-[22px] rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                  openIndex === i
                    ? "border-primary bg-primary/20"
                    : "border-border/60 bg-card/80"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    openIndex === i ? "bg-primary" : "bg-muted-foreground/40"
                  }`}
                />
              </div>

              {/* Card */}
              <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.04]">
                {/* Trigger */}
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center gap-3 p-4 w-full text-left group"
                >
                  {/* Thumbnail preview */}
                  <div className="shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-xl overflow-hidden bg-muted/20 border border-border/20 transition-transform duration-200 group-hover:scale-105">
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
                    <p className="text-sm lg:text-base font-bold text-foreground leading-snug truncate">
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
                      {/* Desktop: side-by-side | Mobile: stacked */}
                      <div className="px-4 pb-4 flex flex-col lg:flex-row gap-4">
                        {/* Text + bullets + CTA */}
                        <div className="flex flex-col gap-3 lg:flex-1 lg:min-w-0">
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

                          <button
                            onClick={() => handleCta(c)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                              background:
                                "linear-gradient(135deg, hsl(168 100% 33%), hsl(168 80% 28%))",
                              boxShadow:
                                "0 6px 24px -6px hsl(168 100% 33% / 0.35)",
                            }}
                          >
                            <ExternalLink size={14} />
                            {c.ctaLabel}
                          </button>
                        </div>

                        {/* Inline screenshot */}
                        <div className="relative group lg:w-[240px] lg:shrink-0">
                          <div className="w-full rounded-xl overflow-hidden border border-border/30 bg-muted/10">
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
                            aria-label="Ampliar screenshot"
                          >
                            <ZoomIn size={14} />
                          </button>
                          <span className="lg:hidden absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/70 bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            Toque para ampliar
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
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
