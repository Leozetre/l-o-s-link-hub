import { TrendingUp, Quote, BarChart3 } from "lucide-react";

const SocialProof = () => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1">
        Resultados
      </h2>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-border/30 bg-card/40 backdrop-blur-sm text-center">
          <TrendingUp size={16} className="text-primary" />
          <span className="text-lg font-extrabold text-foreground leading-none">+70</span>
          <span className="text-[10px] text-muted-foreground leading-tight">
            clientes atendidos em 3 anos
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-border/30 bg-card/40 backdrop-blur-sm text-center">
          <Quote size={14} className="text-primary/60" />
          <p className="text-[11px] text-foreground leading-snug font-medium italic">
            "Triplicamos os leads em 60 dias"
          </p>
          <span className="text-[9px] text-muted-foreground">— Clínica SP</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-border/30 bg-card/40 backdrop-blur-sm text-center">
          <BarChart3 size={16} className="text-primary/60" />
          <div className="flex items-end gap-[3px] h-5">
            {[40, 55, 35, 70, 60, 85, 75].map((h, i) => (
              <div
                key={i}
                className="w-[4px] rounded-sm bg-primary/40"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <span className="text-[9px] text-muted-foreground">painel real de campanha</span>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
