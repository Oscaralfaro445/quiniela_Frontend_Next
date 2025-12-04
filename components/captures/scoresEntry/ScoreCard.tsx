import { GameResult } from "@/types/gameResult/gameResult";
import { Card } from "@/components/shared/card/Card";
import { TeamLogo } from "@/components/shared/teamLogo/TeamLogo";

interface ScoreCardProps {
  game: GameResult;
  getWinner: (partido: number) => string | null;
  handleScoreChange: (
    partido: number,
    team: "away" | "home",
    value: string
  ) => void;
}

export const ScoreCard = ({
  game,
  getWinner,
  handleScoreChange,
}: ScoreCardProps) => {
  const partidoPendiente = game.marcVisita === 0 && game.marLocal === 0;

  return (
    <Card key={game.partido} className="hover:shadow-md transition-shadow">
      <div className="flex gap-4 items-center justify-between">
        <div className="grid w-full items-center gap-4">
          <div
            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
              !partidoPendiente
                ? getWinner(game.partido) === game.nomEquipo1
                  ? "border-green-300"
                  : "border-red-300"
                : "border-neutral-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <TeamLogo teamName={game.nomEquipo1} />

              <div className="hidden sm:block">
                <p className="font-medium">{game.nomEquipo1}</p>
                <p className="text-sm text-gray-600">Visitante</p>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="number"
                min="0"
                max="70"
                value={game.marcVisita}
                onChange={(event) =>
                  handleScoreChange(game.partido, "away", event.target.value)
                }
                className={`w-12 h-12 text-2xl text-neutral-600 font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !partidoPendiente
                    ? getWinner(game.partido) === game.nomEquipo1
                      ? "border-green-300"
                      : "border-red-300"
                    : "border-neutral-300"
                }`}
              />
            </div>
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
              !partidoPendiente
                ? getWinner(game.partido) === game.nomEquipo2
                  ? "border-green-300"
                  : "border-red-300"
                : "border-neutral-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <TeamLogo teamName={game.nomEquipo2} />

              <div className="hidden sm:block">
                <p className="font-medium">{game.nomEquipo2}</p>
                <p className="text-sm text-gray-600">Local</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                max="70"
                value={game.marLocal}
                onChange={(event) =>
                  handleScoreChange(game.partido, "home", event.target.value)
                }
                className={`w-12 h-12 text-2xl text-neutral-600 font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !partidoPendiente
                    ? getWinner(game.partido) === game.nomEquipo2
                      ? "border-green-300"
                      : "border-red-300"
                    : "border-neutral-300"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="hidden sm:block text-center">
          <p className="text-sm text-neutral-600">Diferencia</p>
          <p className="text-sm text-neutral-600">{`${Math.abs(
            game.marcVisita - game.marLocal
          )} pts`}</p>
        </div>
      </div>
    </Card>
  );
};
