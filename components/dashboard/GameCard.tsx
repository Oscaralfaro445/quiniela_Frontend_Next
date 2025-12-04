import { Game } from "@/types/games/game";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { Icon } from "../shared/icon/Icon";
import { Card } from "../shared/card/Card";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card>
      <div className="grid w-full gap-4">
        <div className="flex gap-8 justify-start">
          <div className="flex gap-2 items-center">
            <Icon className="text-blue-600" name="calendar" />
            <p className="text-sm text-gray-600">{game.fechaPartido}</p>
          </div>

          <div className="flex gap-2 items-center">
            <Icon className="text-blue-600" name="map-pin" />
            <p className="text-sm text-gray-600">{game.estadio}</p>
          </div>
        </div>

        <div className="flex w-full gap-10 justify-center items-center">
          <TeamLogo className="" teamName={game.nombreVisitante} />

          <p className="text-neutral-600 text-xl font-semibold">vs</p>

          <TeamLogo className="" teamName={game.nombreLocal} />
        </div>
      </div>
    </Card>
  );
};
