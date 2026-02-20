import { handleTrackedClick } from "@/lib/tracking";
import { MessageCircle, GraduationCap } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const HeroCTA = () => {
  return (
    <section className="flex flex-col items-center text-center gap-5 mb-8">
      {/* Profile photo */}
      <img
        src={profileImg}
        alt="Léo Negrão"
        className="h-20 w-20 rounded-full object-cover ring-2 ring-primary/30"
        style={{ objectPosition: "100% 90%" }}
      />

      {/* Name & tagline */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Léo Negrão
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-sm">
          Estrategista de tráfego pago e fundador da Minimal Marketing
        </p>
      </div>

      {/* Social proof badges */}
      <div className="flex flex-wrap justify-center gap-2">
        {["Imobiliárias", "Clínicas", "Negócios Locais"].map((niche) => (
          <span
            key={niche}
            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-primary/20 text-primary bg-primary/5"
          >
            {niche}
          </span>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground -mt-2">
        +70 clientes atendidos
      </p>

      {/* ── Category A: Primary Actions ── */}
      <button
        onClick={() =>
          handleTrackedClick(
            "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20quero%20um%20diagn%C3%B3stico%20r%C3%A1pido%20para%20meu%20neg%C3%B3cio.",
            "whatsapp_diagnostico",
            "primary"
          )
        }
        className="w-full max-w-md flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, hsl(168 100% 33%), hsl(168 80% 28%))",
          boxShadow: "0 8px 30px -8px hsl(168 100% 33% / 0.4)",
        }}
      >
        <MessageCircle size={20} className="shrink-0" />
        <div className="flex flex-col items-start">
          <span className="font-bold text-base sm:text-lg leading-tight">Assessoria de Marketing — WhatsApp</span>
          <span className="text-[10px] sm:text-[11px] font-medium opacity-70 leading-tight line-clamp-2">Para empresários (imobiliárias, clínicas e negócios locais)</span>
        </div>
      </button>

      <button
        onClick={() =>
          handleTrackedClick(
            "https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20aplicar%20para%20a%20mentoria%20Minimal%20PRO.",
            "minimal_pro_aplicacao",
            "primary"
          )
        }
        className="w-full max-w-md flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl border border-primary/30 text-primary bg-primary/5 transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 active:scale-[0.98]"
      >
        <GraduationCap size={18} className="shrink-0" />
        <div className="flex flex-col items-start">
          <span className="font-bold text-sm sm:text-base leading-tight">Minimal Pro — Mentoria</span>
          <span className="text-[10px] sm:text-[11px] font-medium opacity-60 leading-tight line-clamp-2">Para gestores de tráfego e players do digital</span>
        </div>
      </button>
    </section>
  );
};

export default HeroCTA;
