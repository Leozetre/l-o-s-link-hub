import profileImage from "@/assets/profile.jpg";

const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-center text-center mb-10">
      <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-2 ring-offset-background mb-5">
        <img
          src={profileImage}
          alt="Léo Negrão"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h1 className="text-2xl font-bold text-foreground tracking-tight">
        Léo Negrão
      </h1>
      <h2 className="text-sm font-semibold text-primary mt-1 uppercase tracking-widest">
        Minimal Marketing
      </h2>
      <p className="text-muted-foreground text-sm mt-3 font-medium">
        Estratégia. Vendas. Resultado.
      </p>
    </div>
  );
};

export default ProfileHeader;
