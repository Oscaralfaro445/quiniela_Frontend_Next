import Image from "next/image";

interface TeamLogoProps {
  teamName: string;
  className?: string;
}

const getTeamLogo = (teamName: string) => {
  const name = teamName.split(" ");
  return name.at(-1)?.toLocaleLowerCase();
};

export const TeamLogo = ({ teamName, className }: TeamLogoProps) => {
  const src = getTeamLogo(teamName);

  return (
    <div className={className}>
      <figure className="relative w-20 h-20">
        <Image
          src={`/images/logos/${src}.png`}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 40px, (max-width: 1200px) 80px, 100px"
          alt={teamName}
        />
      </figure>
    </div>
  );
};
