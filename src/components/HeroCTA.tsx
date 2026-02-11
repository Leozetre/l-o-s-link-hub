import { handleTrackedClick } from "@/lib/tracking";
import { MessageCircle } from "lucide-react";

const HeroCTA = () => {
  return (
    <section className="flex flex-col items-center text-center gap-6 mb-8">
      {/* Name & tagline */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Léo Negrão
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-md">
          Estrategista de tráfego pago e fundador da Minimal Marketing
        </p>
      </div>

      {/* Social proof strip */}
      <div className="flex flex-wrap justify-center gap-2">
        {["Imobiliárias", "Clínicas", "Negócios Locais"].map((niche) => (
          <span
            key={niche}
            className="text-xs font-semibold px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5"
          >
            {niche}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        +70 clientes atendidos em nichos de alta performance
      </p>

      {/* Primary CTA */}
      <button
        onClick={() =>
          handleTrackedClick(
            "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20me%20tornar%20cliente%20da%20Minimal%20Marketing.",
            "whatsapp_cta_hero",
            "servico"
          )
        }
        className="w-full max-w-md flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-lg text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        style={{
          background: "linear-gradient(135deg, hsl(168 100% 33%), hsl(168 80% 28%))",
          boxShadow: "0 8px 30px -8px hsl(168 100% 33% / 0.4)",
        }}
      >
        <MessageCircle size={22} />
        Quero contratar a Minimal Marketing
      </button>
    </section>
  );
};

export default HeroCTA;
