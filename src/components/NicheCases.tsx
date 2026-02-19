import { useState } from "react";
import { trackEvent } from "@/lib/tracking";
import caseImobiliarioVirada from "@/assets/case-imobiliario-virada.png";
import caseOdontoAcessivel from "@/assets/case-odonto-acessivel.png";
import caseOdontoPremium from "@/assets/case-odonto-premium.png";
import caseOdontoZero from "@/assets/case-odonto-zero.png";
import caseVarejoCrescimento from "@/assets/case-varejo-crescimento.png";
import caseImobiliarioCorretora from "@/assets/case-imobiliario-corretora.png";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ExternalLink,
  ImageOff,
  Stethoscope,
  Store,
  ZoomIn,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CaseCard {
  id: string;
  badge: string;
  headline: string;
  context: string;
  bullets: [string, string, string];
  ctaLabel: string;
  whatsappUrl: string;
  /** Path to uploaded screenshot – leave empty to show fallback */
  screenshotUrl?: string;
}

interface NicheTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  cases: CaseCard[];
}

// ── Data ────────────────────────────────────────────────────────────
const tabs: NicheTab[] = [
  {
    id: "imobiliario",
    label: "Imobiliário",
    icon: <Building2 size={14} />,
    cases: [
      {
        id: "imobiliario-virada",
        badge: "Virada",
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
        screenshotUrl: caseImobiliarioVirada,
      },
      {
        id: "imobiliario-corretora",
        badge: "Confiança",
        headline: "Corretora: confiança recuperada e venda de alto ticket",
        context: "8+ meses de parceria • captação + atendimento",
        bullets: [
          "Veio com trauma de más agências e sem confiança no digital",
          "Ajuste de posicionamento, criativos e rotina de WhatsApp",
          "Venda de chácara acima de R$ 2M durante a parceria",
        ],
        ctaLabel: "Quero estruturar meu funil",
        whatsappUrl:
          "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20da%20corretora%20(alto%20ticket).%20Quero%20estruturar%20meu%20funil.%20Regi%C3%A3o%3A%20__.%20Tipo%20de%20im%C3%B3vel%3A%20__.%20Meta%20mensal%3A%20__.",
        screenshotUrl: caseImobiliarioCorretora,
      },
    ],
  },
  {
    id: "odonto",
    label: "Odonto",
    icon: <Stethoscope size={14} />,
    cases: [
      {
        id: "odonto-acessivel",
        badge: "Volume",
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
        screenshotUrl: caseOdontoAcessivel,
      },
      {
        id: "odonto-premium",
        badge: "Premium",
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
        screenshotUrl: caseOdontoPremium,
      },
      {
        id: "odonto-zero",
        badge: "Do zero",
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
        screenshotUrl: caseOdontoZero,
      },
    ],
  },
  {
    id: "varejo",
    label: "Varejo",
    icon: <Store size={14} />,
    cases: [
      {
        id: "varejo-crescimento",
        badge: "Long-term",
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
        screenshotUrl: caseVarejoCrescimento,
      },
    ],
  },
];

const segmentColors: Record<string, string> = {
  odonto: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  imobiliario: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  varejo: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

// ── Component ───────────────────────────────────────────────────────
const NicheCases = () => {
  const [activeTab, setActiveTab] = useState("imobiliario");
  // True accordion: always exactly one expanded (first by default)
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [zoomedId, setZoomedId] = useState<string | null>(null);

  const active = tabs.find((t) => t.id === activeTab)!;

  const MOBILE_LIMIT = 2;

  // Derive effective expanded id: if none set, default to first case
  const effectiveExpandedId = expandedId ?? active.cases[0]?.id ?? null;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setExpandedId(null); // reset → first case auto-expands
    setShowAll(false);
  };

  const toggle = (caseId: string, caseData: CaseCard) => {
    if (effectiveExpandedId === caseId) {
      // Clicking the already-open one: collapse all (no case open)
      setExpandedId("__none__");
    } else {
      trackEvent({
        event_name: "case_expand",
        button_name: caseData.headline,
        category: activeTab,
      });
      setExpandedId(caseId);
    }
  };

  const handleCta = (c: CaseCard) => {
    trackEvent({
      event_name: "case_cta_click",
      button_name: c.headline,
      category: activeTab,
      href: c.whatsappUrl,
    });
    window.open(c.whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleZoom = (c: CaseCard) => {
    if (!c.screenshotUrl) return;
    trackEvent({
      event_name: "screenshot_zoom",
      button_name: c.id,
      category: activeTab,
    });
    setZoomedId(c.id);
  };

  const hasScreenshot = (url?: string) => !!url && url.length > 0;

  return (
    <section id="cases" className="flex flex-col gap-4 mb-8">
      <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1">
        Cases por nicho
      </h2>

      {/* Tab bar */}
      <div className="flex gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTabChange(t.id)}
            className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200 ${
              activeTab === t.id
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Case cards — true accordion */}
      <div className="flex flex-col gap-3">
        {active.cases.map((c, i) => {
          const isExpanded = effectiveExpandedId === c.id;
          const hiddenOnMobile = !showAll && i >= MOBILE_LIMIT;

          return (
            <div
              key={c.id}
              className={`${hiddenOnMobile ? "hidden md:block" : ""}`}
            >
              <div className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.04]">
                {/* Header — always visible */}
                <button
                  onClick={() => toggle(c.id, c)}
                  className="flex items-center gap-3 p-4 w-full text-left group"
                >
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border w-fit ${segmentColors[activeTab] || ""}`}
                    >
                      {c.badge}
                    </span>
                    <p className="text-sm lg:text-base font-bold text-foreground leading-snug">
                      {c.headline}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1">
                      {c.context}
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCta(c);
                            }}
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

                        {/* Screenshot area */}
                        <div className="relative group/img lg:w-[320px] lg:shrink-0">
                          {hasScreenshot(c.screenshotUrl) ? (
                            <>
                              <div className="w-full rounded-xl overflow-hidden border border-border/30 bg-muted/10 flex items-center justify-center">
                                <img
                                  src={c.screenshotUrl}
                                  alt={`Screenshot ${c.badge}`}
                                  loading="lazy"
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleZoom(c);
                                }}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/70 backdrop-blur-sm border border-border/30 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Ampliar screenshot"
                              >
                                <ZoomIn size={14} />
                              </button>
                            </>
                          ) : (
                            <div className="w-full rounded-xl border border-dashed border-border/40 bg-muted/5 flex items-center justify-center gap-2 py-8 lg:py-12">
                              <ImageOff size={16} className="text-muted-foreground/50" />
                              <span className="text-[11px] text-muted-foreground/50 font-medium">
                                Imagem não configurada
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}

        {/* "Mostrar mais" — mobile only */}
        {!showAll && active.cases.length > MOBILE_LIMIT && (
          <button
            onClick={() => setShowAll(true)}
            className="md:hidden flex items-center justify-center gap-1.5 text-xs font-semibold text-primary py-2 transition-colors hover:text-primary/80"
          >
            Mostrar mais ({active.cases.length - MOBILE_LIMIT})
            <ArrowRight size={12} />
          </button>
        )}
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {zoomedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setZoomedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomedId(null)}
                className="absolute -top-10 right-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
              {(() => {
                const zoomedCase = active.cases.find((c) => c.id === zoomedId);
                const src = zoomedCase?.screenshotUrl;
                return hasScreenshot(src) ? (
                  <img
                    src={src}
                    alt="Screenshot ampliado"
                    className="w-full h-auto object-contain rounded-2xl border border-border/40"
                  />
                ) : null;
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NicheCases;
