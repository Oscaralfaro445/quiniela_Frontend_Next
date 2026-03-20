import { useEffect, useState } from "react";
import { participante } from "@/hooks/queries/useGetParticipantPositions";
import { Icon } from "../shared/icon/Icon";
import { ResultsQuiniela } from "./ResultsQuiniela";
import { TabType } from "../shared/tabs/TabSelector";

interface ParticipantCardProps {
  player: participante;
  period: number;
  activeTab: TabType;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Icon name="crown" className="text-yellow-500" />;
    case 2:
      return <Icon name="medal" className="text-gray-500" />;
    case 3:
      return <Icon name="award" className="text-orange-500" />;
    default:
      return <p className="text-lg font-semibold text-neutral-600">#{rank}</p>;
  }
};

const getNameAbbr = (teamName: string) => {
  return teamName.split(" ").map((word) => word.charAt(0).toUpperCase());
};

export const ParticipantCard = ({
  player,
  period,
  activeTab,
}: ParticipantCardProps) => {
  const [showPredictions, setShowPredictions] = useState(false);
  const [participant, setParticipant] = useState({
    idParticipante: 0,
    idQuiniela: 0,
    periodo: 0,
  });

  useEffect(() => {
    setShowPredictions(false);
  }, [period]);

  const handleShowPredictions = () => {
    setParticipant({
      idParticipante: player.ID_PARTICIPANTE,
      idQuiniela: player.ID_QUINIELA,
      periodo: period,
    });
    setShowPredictions((prev) => !prev);
  };

  return (
    <div>
      <div
        className={`relative flex p-4 items-center justify-between rounded-lg border transition-all duration-200 hover:shadow-sm ${activeTab === 0 ? "cursor-pointer" : ""} ${
          player.Posicion <= 3
            ? "bg-blue-50 border-blue-300 hover:bg-blue-100"
            : "bg-neutral-50 border-gray-400 hover:bg-neutral-100"
        }`}
        onClick={handleShowPredictions}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10">
            {getRankIcon(player.Posicion)}
          </div>

          <div className="hidden md:flex w-10 h-10 bg-blue-700 rounded-full items-center justify-center">
            <p className="text-sm font-bold text-white">
              {getNameAbbr(player.Nombre)}
            </p>
          </div>

          <p className="font-medium text-neutral-600">{player.Nombre}</p>
        </div>

        {player.B_GANADOR && (
          <p className="text-lg font-semibold text-red-600">
            {`Ganador por ${player.DIFERENCIAL} puntos`}
          </p>
        )}

        <p className="text-lg font-semibold text-neutral-600">
          {`${player.Puntos} puntos`}
        </p>
      </div>

      {showPredictions && activeTab === 0 && (
        <ResultsQuiniela participant={participant} />
      )}
    </div>
  );
};
