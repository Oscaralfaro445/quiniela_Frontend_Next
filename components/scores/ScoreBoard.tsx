import { useState } from "react";
import { GameResult } from "@/types/gameResult/gameResult";
import { Modal } from "../shared/modal/Modal";
import { MatchPredictionCard } from "./MatchPredictionCard";
import { ScoreCard } from "./ScoreCard";

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
    <>
      <div className="grid lg:grid-cols-2 gap-4">
        {gameResults.map((game, index) => (
          <ScoreCard
            key={index}
            game={game}
            getWinner={getWinner}
            handlePredictionClick={handlePredictionClick}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
        <MatchPredictionCard gameId={selectedGame} />
      </Modal>
    </>
  );
};
