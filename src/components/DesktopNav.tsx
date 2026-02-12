const sections = [
  { id: "resultados", label: "Resultados" },
  { id: "cases", label: "Cases" },
  { id: "produtos", label: "Produtos" },
  { id: "servico", label: "Serviço" },
  
];

const DesktopNav = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="hidden lg:flex items-center gap-1 px-2 py-2 rounded-xl border border-border/30 bg-card/40 backdrop-blur-md sticky top-4 z-40 mb-6">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors duration-200"
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
};

export default DesktopNav;
