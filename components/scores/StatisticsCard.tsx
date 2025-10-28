import { GameResult } from "@/types/gameResult/gameResult";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

interface StatisticsCardProps {
  gameResults: GameResult[];
  week: string | undefined;
}

export const StatisticsCard = ({ gameResults, week }: StatisticsCardProps) => {
  const totalGames = gameResults?.length;

  const completedGames = gameResults?.filter(
    (game) => game.marcVisita !== 0 && game.marLocal !== 0
  ).length;

  const highestScoringGame = gameResults?.length
    ? gameResults.reduce((max, game) =>
        game.marcVisita + game.marLocal > max.marcVisita + max.marLocal
          ? game
          : max
      )
    : null;

  const getTeamAbbr = (teamName: string) => {
    return teamName.split(" ").pop()?.substring(0, 3).toUpperCase() || "TBD";
  };

  const getBiggestDifference = () => {
    const maxDifference = gameResults.reduce((maxDiff, game) => {
      const difference = Math.abs(game.marcVisita - game.marLocal);
      if (difference > maxDiff) return difference;
      else return maxDiff;
    }, 0);

    const biggestGame: GameResult = gameResults.reduce(
      (biggestGame, game) => {
        const difference = Math.abs(game.marcVisita - game.marLocal);
        if (difference === maxDifference) return game;
        else return biggestGame;
      },
      {
        partido: 0,
        idEquipo1: 0,
        nomEquipo1: "",
        marcVisita: 0,
        Equipo2: 0,
        nomEquipo2: "",
        marLocal: 0,
      }
    );

    return { maxDifference, biggestGame };
  };

  return (
    <>
      {gameResults && (
        <section>
          <div className="grid lg:flex max-w-[1280px] mx-auto px-10 py-8 gap-4">
            <Card className="border-gray-200">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-gray-600">
                  Juegos Completados
                </div>
                <Icon className="text-blue-600" name="calendar" />
              </div>

              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {completedGames}/{totalGames}
                </div>
                <p className="text-xs text-gray-600">Semana {week}</p>
              </div>
            </Card>

            <Card className="border-gray-200">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-gray-600">
                  Mayor Anotación
                </div>
                <Icon className="text-blue-600" name="trophy" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {highestScoringGame
                    ? highestScoringGame.marcVisita +
                      highestScoringGame.marLocal
                    : 0}
                </div>
                <p className="text-xs text-gray-600">
                  {highestScoringGame
                    ? `${getTeamAbbr(
                        highestScoringGame.nomEquipo1
                      )} vs ${getTeamAbbr(highestScoringGame.nomEquipo2)}`
                    : ""}
                </p>
              </div>
            </Card>

            <Card className="border-gray-200">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-gray-600">
                  Promedio de Puntos
                </div>
                <Icon className="text-blue-600" name="clock" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    gameResults.reduce(
                      (sum, game) => sum + game.marcVisita + game.marLocal,
                      0
                    ) / totalGames
                  )}
                </div>
                <p className="text-xs text-gray-600">Por juego</p>
              </div>
            </Card>

            <Card className="border-gray-200">
              <div>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium text-gray-600">
                    Paliza de la semana
                  </div>
                  <Icon className="text-blue-600" name="clock" />
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <TeamLogo
                      className="transform scale-60"
                      teamName={getBiggestDifference().biggestGame.nomEquipo1}
                    />
                    vs
                    <TeamLogo
                      className="transform scale-60"
                      teamName={getBiggestDifference().biggestGame.nomEquipo2}
                    />
                  </div>

                  <div className="text-2xl font-bold text-gray-900">
                    {getBiggestDifference().maxDifference}
                  </div>
                  <p className="text-xs text-gray-600">Puntos de diferencia</p>
                </div>
              </div>
            </Card>

            <Card className="border-gray-200">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-gray-600">
                  Partido ganados
                </div>
                <Icon className="text-blue-600" name="clock" />
              </div>

              <div className="flex justify-center gap-10">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                    {Math.round(
                      gameResults.reduce((sum, game) => {
                        if (game.marcVisita > game.marLocal) return sum + 1;
                        else return sum;
                      }, 0)
                    )}
                    <Icon name="bus" />
                  </div>
                  <span className="text-xs text-neutral-500">Visita</span>{" "}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                    {Math.round(
                      gameResults.reduce((sum, game) => {
                        if (game.marLocal > game.marcVisita) return sum + 1;
                        else return sum;
                      }, 0)
                    )}
                    <Icon name="house" />
                  </div>
                  <span className="text-xs text-neutral-500">Local</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}
    </>
  );
};
