import { useState } from "react";
import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { TeamQuinielaCard } from "./TeamQuinielaCard";
import { ScoresCard } from "./ScoresCard";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { Modal } from "../shared/modal/Modal";

interface GroupRadioProps {
  disabled: boolean;
  game: QuinielaItem;
  quinielaData: QuinielaItem[];
  handleChangeQuiniela: (idGame: number, team: string) => void;
  handleScoreChange: (
    partido: number,
    team: "away" | "home",
    score: number,
  ) => void;
}

export const GroupRadio = ({
  disabled,
  game,
  // quinielaData,
  handleChangeQuiniela,
  handleScoreChange,
}: GroupRadioProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <Card>
        <div className="grid gap-4">
          <div className="grid sm:flex w-full gap-4 justify-start items-center">
            <div className="flex gap-2">
              <Icon name="clock" size={18} />
              <p className="text-sm">{game.Fecha}</p>
            </div>

            <div className="flex gap-2">
              <Icon name="map-pin" size={18} />
              <p className="text-sm">{game.Estadio}</p>
            </div>
          </div>

          {game.bMarcador && (
            <p className="text-blue-600">
              Este partido se utilizará para diferenciar posiciones en caso de
              empate. Ingresa tu pronóstico del marcador.
            </p>
          )}

          {Array.from({ length: 2 }).map((_, index) => (
            <TeamQuinielaCard
              key={index}
              team={index === 0 ? "V" : "L"}
              game={game}
              disabled={disabled}
              setSelectedTeam={setSelectedTeam}
              handleChangeQuiniela={handleChangeQuiniela}
              handleModalOpen={handleModalOpen}
              handleScoreChange={handleScoreChange}
            />
          ))}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
        <ScoresCard teamId={selectedTeam.id} teamName={selectedTeam.name} />
      </Modal>
    </>
  );
};
