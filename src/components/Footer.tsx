const MinimalLogo = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    className="text-primary"
  >
    <rect width="28" height="28" rx="6" className="fill-primary/10" />
    <text
      x="14"
      y="20"
      textAnchor="middle"
      className="fill-primary"
      fontSize="16"
      fontWeight="800"
      fontFamily="Manrope, sans-serif"
    >
      M
    </text>
  </svg>
);

const Footer = () => {
  return (
    <footer className="mt-12 flex flex-col items-center gap-3 pb-8">
      <MinimalLogo />
      <p className="text-xs text-muted-foreground">
        Developed by{" "}
        <span className="font-semibold text-foreground/70">Léo Negrão</span>
      </p>
    </footer>
  );
};

export default Footer;
