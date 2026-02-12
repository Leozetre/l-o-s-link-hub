import { useState } from "react";
import { handleTrackedClick } from "@/lib/tracking";
import { ArrowRight, Building2, Stethoscope, Store } from "lucide-react";

interface CaseCard {
  headline: string;
  result: string;
  whatsappUrl: string;
}

interface NicheTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  cases: CaseCard[];
}

const tabs: NicheTab[] = [
  {
    id: "odonto",
    label: "Odonto",
    icon: <Stethoscope size={14} />,
    cases: [
      {
        headline: "Captação com custo competitivo",
        result: "Volume + eficiência em 90 dias",
        whatsappUrl:
          "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20de%20Odonto.%20Quero%20saber%20mais.%20Cidade%3A%20__.%20Procedimento%3A%20__.",
      },
      {
        headline: "Demanda qualificada premium",
        result: "Ticket médio 3x maior",
        whatsappUrl:
          "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20de%20Odonto%20premium.%20Quero%20atrair%20pacientes%20qualificados.%20Cidade%3A%20__.",
      },
    ],
  },
  {
    id: "imobiliario",
    label: "Imobiliário",
    icon: <Building2 size={14} />,
    cases: [
      {
        headline: "Funil de captação e vendas",
        result: "Oportunidades consistentes em 6 meses",
        whatsappUrl:
          "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20imobili%C3%A1rio.%20Quero%20estruturar%20meu%20funil.%20Regi%C3%A3o%3A%20__.",
      },
    ],
  },
  {
    id: "varejo",
    label: "Varejo",
    icon: <Store size={14} />,
    cases: [
      {
        headline: "Presença digital + vendas constantes",
        result: "Parceria de 2+ anos com crescimento",
        whatsappUrl:
          "https://wa.me/5512997289339?text=Ol%C3%A1!%20Vi%20o%20case%20de%20varejo.%20Quero%20melhorar%20meu%20tr%C3%A1fego.%20Cidade%3A%20__.",
      },
    ],
  },
];

const NicheCases = () => {
  const [activeTab, setActiveTab] = useState("odonto");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1">
        Cases por nicho
      </h2>

      {/* Tab bar */}
      <div className="flex gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
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

      {/* Cases */}
      <div className="flex flex-col gap-2">
        {active.cases.map((c, i) => (
          <button
            key={i}
            onClick={() =>
              handleTrackedClick(c.whatsappUrl, `niche_${activeTab}_${i}`, "case")
            }
            className="group flex items-center justify-between w-full p-3 rounded-xl border border-border/30 bg-card/40 backdrop-blur-sm text-left transition-all duration-300 hover:border-primary/20"
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-sm font-bold text-foreground leading-snug">
                {c.headline}
              </span>
              <span className="text-[11px] text-muted-foreground">{c.result}</span>
            </div>
            <ArrowRight
              size={14}
              className="shrink-0 ml-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default NicheCases;
