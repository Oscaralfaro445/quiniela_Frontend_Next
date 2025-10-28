import { useState } from "react";
import { GameResult } from "@/types/gameResult/gameResult";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { Modal } from "../shared/modal/Modal";
import { MatchPredictionCard } from "./MatchPredictionCard";
import { Button } from "../shared/button/Button";

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
      <section>
        <div className="grid max-w-[1280px] mx-auto px-10 py-8 gap-4">
          {gameResults.map((game) => (
            <Card
              key={game.partido}
              className="border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4 items-center justify-between">
                <div className="flex w-8 h-8 items-center justify-center bg-blue-100 rounded-full">
                  <span className="text-sm font-bold text-blue-700">
                    {game.partido}
                  </span>
                </div>

                <div className="grid w-full items-center gap-4">
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                      getWinner(game.partido) === game.nomEquipo1
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <TeamLogo
                        className="transform scale-75 lg:scale-100"
                        teamName={game.nomEquipo1}
                      />

                      <div className="hidden sm:block">
                        <span className="font-medium">{game.nomEquipo1}</span>

                        <div className="text-sm text-gray-500">Visitante</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <p
                        className={`w-16 h-12 text-2xl font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          getWinner(game.partido) === game.nomEquipo1
                            ? "text-green-800 border-green-300 bg-green-50"
                            : "text-gray-900 border-gray-300 bg-white"
                        }`}
                      >
                        {game.marcVisita}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                      getWinner(game.partido) === game.nomEquipo2
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <TeamLogo
                        className="transform scale-75 lg:scale-100"
                        teamName={game.nomEquipo2}
                      />

                      <div className="hidden sm:block">
                        <span className="font-medium">{game.nomEquipo2}</span>

                        <div className="text-sm text-gray-500">Local</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <p
                        className={`w-16 h-12 text-2xl font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          getWinner(game.partido) === game.nomEquipo2
                            ? "text-green-800 border-green-300 bg-green-50"
                            : "text-gray-900 border-gray-300 bg-white"
                        }`}
                      >
                        {game.marLocal}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block text-center">
                  <div className="text-sm text-gray-500 mb-1">Diferencia</div>
                  {Math.abs(game.marcVisita - game.marLocal)} pts
                </div>
              </div>

              <Button
                type="button"
                title="Ver Predicción"
                onClick={() => handlePredictionClick(game.partido)}
              />
            </Card>
          ))}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
        <MatchPredictionCard gameId={selectedGame} />
      </Modal>
    </>
  );
};
