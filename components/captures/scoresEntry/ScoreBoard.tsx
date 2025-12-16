import { GameResult } from "@/types/gameResult/gameResult";
import { ScoreCard } from "./ScoreCard";

interface ScoreBoardProps {
  gameResults: GameResult[];
  handleScoreChange: (
    partido: number,
    team: "away" | "home",
    value: string
  ) => void;
}

export const ScoreBoard = ({
  gameResults,
  handleScoreChange,
}: ScoreBoardProps) => {
  const getWinner = (partido: number) => {
    const game = gameResults.find((game) => game.partido === partido);

    if (!game) return null;

    if (game.marcVisita > game.marLocal) {
      return game.nomEquipo1;
    } else if (game.marLocal > game.marcVisita) {
      return game.nomEquipo2;
    }
    return null;
  };

  return (
    <div className="grid lg:grid-cols-2 max-w-[1280px] mx-auto px-10 py-8 gap-4">
      {gameResults.map((game, index) => (
        <ScoreCard
          key={index}
          game={game}
          getWinner={getWinner}
          handleScoreChange={handleScoreChange}
        />
      ))}
    </div>
  );
};
