import { useState } from "react";
import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { ScoresCard } from "./ScoresCard";
import { Modal } from "../shared/modal/Modal";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

interface GroupRadioProps {
  disabled: boolean;
  game: QuinielaItem;
  quinielaData: QuinielaItem[];
  handleChangeQuiniela: (idGame: number, team: string) => void;
}

export const GroupRadio = ({
  disabled,
  game,
  // quinielaData,
  handleChangeQuiniela,
}: GroupRadioProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow bg-blue-50">
        <div className="grid lg:flex w-full gap-4 justify-start items-center">
          <div className="flex gap-2">
            <Icon name="clock" size={18} />
            <p className="text-sm">{game.Fecha}</p>
          </div>

          <div className="flex gap-2">
            <Icon name="map-pin" size={18} />
            <p className="text-sm">{game.Estadio}</p>
          </div>
        </div>

        <Card className="bg-white">
          <div className="flex w-full justify-between items-center">
            <div className="flex w-full justify-start items-center gap-2">
              <input
                className="h-4 w-4"
                type="radio"
                name={`game-${game.Partido}`}
                id={`game-${game.EquipoV}`}
                value={game.EquipoV}
                disabled={disabled}
                checked={game.partGanador === "V"}
                onChange={(event) =>
                  handleChangeQuiniela(game.Partido, event.target.value)
                }
              />

              <div onClick={handleModalOpen}>
                <TeamLogo teamName={game.EquipoV} />
              </div>

              <div>
                <label htmlFor={`game-${game.Partido}`} className="text-sm">
                  {game.EquipoV}
                </label>

                <p className="text-red-600 font-semibold">{`${game.numGanadosV}-${game.numEmpatadosV}-${game.numPerdidosV}`}</p>
              </div>
            </div>

            {game.partGanador === "V" && <Icon name="check" size={25} />}
          </div>
        </Card>

        <Card className="bg-white">
          <div className="flex w-full justify-between items-center">
            <div className="flex w-full justify-start items-center gap-2">
              <input
                className="h-4 w-4"
                type="radio"
                name={`game-${game.Partido}`}
                id={`game-${game.EquipoL}`}
                value={game.EquipoL}
                disabled={disabled}
                checked={game.partGanador === "L"}
                onChange={(event) =>
                  handleChangeQuiniela(game.Partido, event.target.value)
                }
              />

              <div onClick={handleModalOpen}>
                <TeamLogo teamName={game.EquipoL} />
              </div>

              <div>
                <label htmlFor={`game-${game.Partido}`} className="text-sm">
                  {game.EquipoL}
                </label>

                <p className="text-red-600 font-semibold">{`${game.numGanadosL}-${game.numEmpatadosL}-${game.numPerdidosL}`}</p>
              </div>
            </div>

            {game.partGanador === "L" && <Icon name="check" size={25} />}
          </div>
        </Card>
      </Card>

      <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
        <ScoresCard teamId={game.IdV} teamName={game.EquipoV} />
      </Modal>
    </>
  );
};
