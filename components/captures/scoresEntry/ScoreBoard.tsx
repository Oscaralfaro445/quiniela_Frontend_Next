import { GameResult } from "@/types/gameResult/gameResult";
import { ScoreCard } from "./ScoreCard";
import { Card } from "@/components/shared/card/Card";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";

interface ScoreBoardProps {
  gameResults: GameResult[];
  handleScoreChange: (
    partido: number,
    team: "away" | "home",
    value: string,
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
    <Card>
      <div className="grid gap-2">
        <Title title="Marcadores" />
        <TextBody text="Consulta los resultados de los partidos y las elecciones de cada participante." />
      </div>

      <div className="grid lg:grid-cols-2 py-4 gap-4">
        {gameResults?.map((game, index) => (
          <ScoreCard
            key={index}
            game={game}
            getWinner={getWinner}
            handleScoreChange={handleScoreChange}
          />
        ))}
      </div>
    </Card>
  );
};
