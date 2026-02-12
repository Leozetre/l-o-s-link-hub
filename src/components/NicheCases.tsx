import { useState } from "react";
import { Building2, Stethoscope, Store } from "lucide-react";

interface CaseCard {
  context: string;
  outcome: string;
}

interface NicheTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  cases: [CaseCard, CaseCard];
}

const tabs: NicheTab[] = [
  {
    id: "imobiliario",
    label: "Imobiliário",
    icon: <Building2 size={14} />,
    cases: [
      {
        context: "Imobiliária regional com baixo volume de leads qualificados",
        outcome: "4x mais agendamentos de visita em 45 dias",
      },
      {
        context: "Construtora lançando empreendimento novo sem base digital",
        outcome: "312 leads qualificados no primeiro mês de campanha",
      },
    ],
  },
  {
    id: "odonto",
    label: "Odonto",
    icon: <Stethoscope size={14} />,
    cases: [
      {
        context: "Clínica odontológica dependendo só de indicação",
        outcome: "Triplicou agendamentos online em 60 dias",
      },
      {
        context: "Rede com 3 unidades sem padrão de captação digital",
        outcome: "Custo por lead reduzido em 58% com campanhas unificadas",
      },
    ],
  },
  {
    id: "local",
    label: "Negócio Local",
    icon: <Store size={14} />,
    cases: [
      {
        context: "Academia de bairro investindo sem retorno claro",
        outcome: "ROI positivo já no segundo mês com tráfego local",
      },
      {
        context: "Restaurante querendo lotar agenda de reservas no fim de semana",
        outcome: "+140% em reservas via Instagram Ads em 30 dias",
      },
    ],
  },
];

const NicheCases = () => {
  const [activeTab, setActiveTab] = useState("imobiliario");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="flex flex-col gap-3 mb-4 lg:mb-0">
      <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1">
        Cases por nicho
      </h2>

      {/* Tab bar */}
      <div className="flex gap-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary border border-primary/30"
                : "bg-card/50 text-muted-foreground border border-border/40 hover:border-border/60"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Case cards */}
      <div className="flex flex-col gap-2">
        {active.cases.map((c, i) => (
          <div
            key={`${activeTab}-${i}`}
            className="flex flex-col gap-1 p-3.5 rounded-xl border border-border/40 bg-card/50"
          >
            <p className="text-xs text-muted-foreground leading-snug">{c.context}</p>
            <p className="text-sm font-bold text-foreground leading-snug">{c.outcome}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NicheCases;
