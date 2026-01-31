import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

interface TeamQuinielaCardProps {
  team: "L" | "V";
  game: QuinielaItem;
  disabled: boolean;
  setSelectedTeam: (team: { id: number; name: string }) => void;
  handleChangeQuiniela: (idGame: number, team: string) => void;
  handleModalOpen: () => void;
}

export const TeamQuinielaCard = ({
  team,
  game,
  disabled,
  setSelectedTeam,
  handleChangeQuiniela,
  handleModalOpen,
}: TeamQuinielaCardProps) => {
  const handleSelectedTeam = () => {
    setSelectedTeam({
      id: team === "V" ? game.IdV : game.IdL,
      name: team === "V" ? game.EquipoV : game.EquipoL,
    });
    handleModalOpen();
  };

  return (
    <Card>
      <div className="flex flex-wrap w-full gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-4 justify-start items-center">
          <div className="flex gap-4 items-center">
            <input
              className="h-4 w-4"
              type="radio"
              name={`game-${game.Partido}`}
              // id={`game-${game.EquipoV}`}
              value={team === "V" ? game.EquipoV : game.EquipoL}
              disabled={disabled}
              checked={
                team === "V"
                  ? game.partGanador === "V"
                  : game.partGanador === "L"
              }
              onChange={(event) =>
                handleChangeQuiniela(game.Partido, event.target.value)
              }
            />

            <div onClick={handleSelectedTeam} className="cursor-pointer">
              <TeamLogo teamName={team === "V" ? game.EquipoV : game.EquipoL} />
            </div>
          </div>

          <div>
            <label htmlFor={`game-${game.Partido}`} className="text-md">
              {team === "V" ? game.EquipoV : game.EquipoL}
            </label>

            <p className="font-semibold text-sm text-red-600">{`${
              team === "V" ? game.numGanadosV : game.numGanadosL
            }-${team === "V" ? game.numPerdidosV : game.numPerdidosL}-${
              team === "V" ? game.numEmpatadosV : game.numEmpatadosL
            }`}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {team === "V" && game.partGanador === "V" && (
            <Icon className="text-green-600" name="check" size={25} />
          )}
          {team === "L" && game.partGanador === "L" && (
            <Icon className="text-green-600" name="check" size={25} />
          )}
          {team === "V" && game.survEquipoV === "TRUE" && (
            <Icon className="text-red-500" name="swords" size={25} />
          )}
          {team === "L" && game.survEquipoL === "TRUE" && (
            <Icon className="text-red-500" name="swords" size={25} />
          )}
        </div>
      </div>
    </Card>
  );
};
