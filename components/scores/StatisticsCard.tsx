import { IconName } from "@/types/icon/icon";
import { GameResult } from "@/types/gameResult/gameResult";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

interface StatisticsCardProps {
  gameResults: GameResult[];
  week: string | undefined;
}

interface InfoCard {
  title: string;
  icon: IconName;
  infomation: string;
  description: string;
}

export const StatisticsCard = ({ gameResults, week }: StatisticsCardProps) => {
  const totalGames = gameResults?.length;

  const completedGames = gameResults?.filter(
    (game) => game.marcVisita !== 0 && game.marLocal !== 0,
  ).length;

  const highestScoringGame = gameResults?.length
    ? gameResults.reduce((max, game) =>
        game.marcVisita + game.marLocal > max.marcVisita + max.marLocal
          ? game
          : max,
      )
    : 0;

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
      },
    );

    return { maxDifference, biggestGame };
  };

  const infoCards: InfoCard[] = [
    {
      title: "Juegos completados",
      icon: "calendar",
      infomation: `${completedGames} / ${totalGames}`,
      description: `Semana ${week}`,
    },
    {
      title: "Mayor anotación",
      icon: "trophy",
      infomation: `${
        highestScoringGame
          ? highestScoringGame.marcVisita + highestScoringGame.marLocal
          : 0
      }`,
      description: `${
        highestScoringGame
          ? `${getTeamAbbr(highestScoringGame.nomEquipo1)} vs ${getTeamAbbr(
              highestScoringGame.nomEquipo2,
            )}`
          : ""
      }`,
    },
    {
      title: "Promedio de puntos",
      icon: "clock",
      infomation: ` ${Math.round(
        gameResults?.reduce(
          (sum, game) => sum + game.marcVisita + game.marLocal,
          0,
        ) / totalGames,
      )}`,
      description: "Por juego",
    },
  ];

  return (
    <>
      {gameResults && (
        <div className="grid lg:flex gap-4">
          {infoCards.map((card, index) => (
            <Card key={index}>
              <div className="flex items justify-between">
                <p className="text-md font-medium text-neutral-600">
                  {card.title}
                </p>

                <Icon className="text-blue-600" name={card.icon} />
              </div>

              <div className="grid gap-1">
                <p className="text-2xl font-bold text-neutral-700">
                  {card.infomation}
                </p>
                <p className="text-xs text-blue-600">{card.description}</p>
              </div>
            </Card>
          ))}

          {/*    <Card>
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
          </Card> */}

          <Card>
            <div>
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-neutral-600">
                  Paliza de la semana
                </div>
                <Icon className="text-blue-600" name="clock" />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <TeamLogo
                    teamName={getBiggestDifference().biggestGame.nomEquipo1}
                  />
                  <p className="text-xl font-bold text-blue-600">vs</p>
                  <TeamLogo
                    teamName={getBiggestDifference().biggestGame.nomEquipo2}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
