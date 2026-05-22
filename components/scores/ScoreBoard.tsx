import { useState } from "react";
import { GameResult } from "@/types/gameResult/gameResult";
import { Modal } from "../shared/modal/Modal";
import { MatchPredictionCard } from "./MatchPredictionCard";
import { ScoreCard } from "./ScoreCard";
import { Card } from "../shared/card/Card";
import { Title } from "../shared/text/Title";
import { TextBody } from "../shared/text/TextBody";

interface ScoreBoardProps {
  gameResults: GameResult[];
}

export const ScoreBoard = ({ gameResults }: ScoreBoardProps) => {
  const [selectedGame, setSelectedGame] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handlePredictionClick = (gameId: number) => {
    setSelectedGame(gameId);
    handleModalOpen();
  };

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

      <div className="grid lg:grid-cols-2 max-h-[600px] py-4 gap-4 overflow-y-auto">
        {gameResults.map((game, index) => (
          <ScoreCard
            key={index}
            game={game}
            getWinner={getWinner}
            handlePredictionClick={handlePredictionClick}
          />
        ))}
      </div>

      <Modal isModalOpen={isModalOpen} closeModal={handleModalOpen}>
        <MatchPredictionCard gameId={selectedGame} />
      </Modal>
    </Card>
  );
};
