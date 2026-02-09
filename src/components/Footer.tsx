import minimalMarketingLogo from "@/assets/minimal-marketing-logo.png";

const Footer = () => {
  return (
    <footer className="mt-10 flex justify-center pb-8">
      <img
        src={minimalMarketingLogo}
        alt="Minimal Marketing"
        className="h-6 opacity-50 hover:opacity-80 transition-opacity duration-300"
      />
    </footer>
  );
};

export default Footer;
