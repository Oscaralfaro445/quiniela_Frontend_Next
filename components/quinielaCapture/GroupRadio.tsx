import { useState } from "react";
import { QuinielaWeekTeam } from "@/types/quiniela/quinielaWeekTeam";
import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { ScoresCard } from "./ScoresCard";
import { Modal } from "../shared/modal/Modal";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

interface GroupRadioProps {
  disabled: boolean;
  game: QuinielaWeekTeam;
  quinielaData: QuinielaItem[];
  handleChangeQuiniela: (idGame: number, team: string) => void;
}

export const GroupRadio = ({
  disabled,
  game,
  quinielaData,
  handleChangeQuiniela,
}: GroupRadioProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow bg-blue-50">
        <div className="flex w-full gap-4 justify-start items-center">
          <Icon name="clock" size={18} />
          <p className="text-sm">{game.Fecha}</p>
          <Icon name="map-pin" size={18} />
          <p className="text-sm">{game.Estadio}</p>
        </div>

        <Card className="bg-white">
          <div className="flex w-full justify-between items-center">
            <div className="flex w-full justify-start items-center gap-2">
              <input
                className="h-4 w-4"
                type="radio"
                name={`game-${game.Partido}`}
                // id={`game-${game.Partido}`}
                // value={game.IdV}
                disabled={disabled}
                /* checked={quinielaData.some(
                (item) =>
                  item.ID_PARTIDO === game.Partido &&
                  item.CVE_GANADOR === game.EquipoV
              )} */

                onChange={() =>
                  handleChangeQuiniela(game.Partido, game.EquipoV)
                }
              />

              <div onClick={handleModalOpen}>
                <TeamLogo teamName={game.EquipoV} />
              </div>

              <label htmlFor={`game-${game.Partido}`} className="text-sm">
                {game.EquipoV}
              </label>
            </div>

            {quinielaData.some(
              (item) =>
                item.ID_PARTIDO === game.Partido &&
                item.CVE_GANADOR === game.EquipoV && (
                  <Icon name="check" size={12} />
                )
            )}
          </div>
        </Card>

        <Card className="bg-white">
          <div className="flex w-full justify-between items-center">
            <div className="flex w-full justify-start items-center gap-2">
              <input
                className="h-4 w-4"
                type="radio"
                name={`game-${game.Partido}`}
                // id={`game-${game.Partido}`}
                // value={game.IdL}
                disabled={disabled}
                /*  checked={quinielaData.some(
                (item) =>
                  item.ID_PARTIDO === game.Partido &&
                  item.CVE_GANADOR === game.EquipoL
              )} */
                onChange={() =>
                  handleChangeQuiniela(game.Partido, game.EquipoL)
                }
              />

              <div onClick={handleModalOpen}>
                <TeamLogo teamName={game.EquipoL} />
              </div>

              <label htmlFor={`game-${game.Partido}`} className="text-sm">
                {game.EquipoL}
              </label>
            </div>

            {quinielaData.some(
              (item) =>
                item.ID_PARTIDO === game.Partido &&
                item.CVE_GANADOR === game.EquipoL && (
                  <Icon name="check" size={12} />
                )
            )}
          </div>
        </Card>
      </Card>

      <Modal isOpen={isModalOpen} onClose={handleModalOpen}>
        <ScoresCard teamId={game.IdV} teamName={game.EquipoV} />
      </Modal>
    </>
  );
};
