import { handleTrackedClick } from "@/lib/tracking";
import { ArrowRight, Youtube, Instagram, Briefcase, Zap } from "lucide-react";
import minimalAcademyLogo from "@/assets/minimal-academy-logo.png";

interface SecondaryLinkProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  trackName: string;
  trackCategory: string;
}

const SecondaryLink = ({ title, description, icon, href, trackName, trackCategory }: SecondaryLinkProps) => (
  <button
    onClick={() => handleTrackedClick(href, trackName, trackCategory)}
    className="group flex items-center justify-between w-full px-4 py-3.5 rounded-xl border border-border/40 bg-card/50 text-left transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
  >
    <div className="flex items-center gap-3 min-w-0">
      <div className="flex items-center justify-center h-9 w-9 rounded-lg border border-border/30 shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-[11px] text-muted-foreground truncate">{description}</span>
      </div>
    </div>
    <ArrowRight
      size={14}
      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 ml-2"
    />
  </button>
);

const CategoryLabel = ({ label }: { label: string }) => (
  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1 pt-4 pb-1">
    {label}
  </p>
);

const SecondaryLinks = () => {
  return (
    <section className="flex flex-col gap-1.5">
      {/* ── Category B: Products ── */}
      <CategoryLabel label="Produtos" />
      <SecondaryLink
        title="Minimal Academy"
        description="Comunidade, networking e tráfego pago"
        icon={
          <img
            src={minimalAcademyLogo}
            alt="Minimal Academy"
            className="h-6 w-auto object-contain mix-blend-screen"
          />
        }
        href="https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20ser%20aluno%20da%20Minimal%20Academy."
        trackName="minimal_academy"
        trackCategory="produto"
      />
      <SecondaryLink
        title="Minimal Core"
        description="Ferramenta prática para gestores de tráfego"
        icon={<Zap size={18} className="text-amber-400" />}
        href="#"
        trackName="minimal_core"
        trackCategory="produto"
      />

      {/* ── Category C: Service ── */}
      <CategoryLabel label="Serviço" />
      <SecondaryLink
        title="Contratar Minimal Marketing"
        description="Assessoria e gestão de tráfego para seu negócio"
        icon={<Briefcase size={18} className="text-primary" />}
        href="https://wa.me/5512997289339?text=Ol%C3%A1%2C%20gostaria%20de%20me%20tornar%20cliente%20da%20Minimal%20Marketing."
        trackName="whatsapp_cta_servico"
        trackCategory="servico"
      />

      {/* ── Category D: Content ── */}
      <CategoryLabel label="Conteúdo" />
      <SecondaryLink
        title="YouTube"
        description="Mercado digital e tráfego sem filtro"
        icon={<Youtube size={18} className="text-red-500" />}
        href="https://www.youtube.com/@euleonegrao?utm_source=linkhub&utm_medium=button&utm_campaign=content&utm_content=youtube"
        trackName="youtube"
        trackCategory="conteudo"
      />
      <SecondaryLink
        title="Instagram"
        description="Rotina real de quem vive disso"
        icon={<Instagram size={18} className="text-pink-400" />}
        href="https://www.instagram.com/euleonegrao/?utm_source=linkhub&utm_medium=button&utm_campaign=content&utm_content=instagram"
        trackName="instagram"
        trackCategory="conteudo"
      />
    </section>
  );
};

export default SecondaryLinks;
