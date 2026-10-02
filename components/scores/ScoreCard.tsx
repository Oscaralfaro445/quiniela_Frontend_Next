import { GameResult } from "@/types/gameResult/gameResult";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { Button } from "../shared/button/Button";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useEffect, useState } from "react";

interface ScoreCardProps {
  game: GameResult;
  getWinner: (partido: number) => string | null;
  handlePredictionClick: (gameId: number) => void;
}

export const ScoreCard = ({
  game,
  getWinner,
  handlePredictionClick,
}: ScoreCardProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { data: userData } = useGetMe();
  const userInfo = userData?.data?.[0];
  const partidoPendiente = game.marcVisita === 0 && game.marLocal === 0;

  useEffect(() => {
    if (!userInfo?.fLimite || !userInfo?.horaLimite) {
      return;
    }

    const limitDate = new Date(`${userInfo.fLimite}T${userInfo.horaLimite}`);

    const remainingTime = limitDate.getTime() - Date.now();

    if (remainingTime <= 0) {
      setIsDisabled(false);
      return;
    }

    const timeout = setTimeout(() => {
      setIsDisabled(false);
    }, remainingTime);

    return () => clearTimeout(timeout);
  }, [userInfo?.fLimite, userInfo?.horaLimite]);

  return (
    <Card>
      <div className="transition-shadow space-y-4">
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
                <p
                  className={`w-12 h-12 text-2xl text-neutral-600 font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !partidoPendiente
                      ? getWinner(game.partido) === game.nomEquipo1
                        ? "border-green-300"
                        : "border-red-300"
                      : "border-neutral-300"
                  }`}
                >
                  {game.marcVisita}
                </p>
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

              <p
                className={`w-12 h-12 text-2xl text-neutral-600 font-bold text-center border-2 rounded-lg ${
                  !partidoPendiente
                    ? getWinner(game.partido) === game.nomEquipo2
                      ? "border-green-300"
                      : "border-red-300"
                    : "border-neutral-300"
                }`}
              >
                {game.marLocal}
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-center">
            <p className="text-sm text-neutral-600">Diferencia</p>
            <p className="text-sm text-neutral-600">{`${Math.abs(
              game.marcVisita - game.marLocal,
            )} pts`}</p>
          </div>
        </div>

        <Button
          type="button"
          title="Ver Predicción"
          disabled={isDisabled}
          onClick={() => handlePredictionClick(game.partido)}
        />
      </div>
    </Card>
  );
};
