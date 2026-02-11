const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Animated gradient */}
      <div className="animated-gradient absolute inset-0" />
      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 opacity-[0.03] pointer-events-none" />
      {/* Soft blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/[0.04] blur-[100px] animate-blob" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-primary/[0.03] blur-[100px] animate-blob animation-delay-4000" />
    </div>
  );
};

export default AnimatedBackground;
