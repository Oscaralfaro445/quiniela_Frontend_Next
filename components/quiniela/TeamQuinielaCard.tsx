import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { Icon } from "../shared/icon/Icon";

interface TeamQuinielaCardProps {
  team: "L" | "V";
  game: QuinielaItem;
  disabled: boolean;
  setSelectedTeam: (team: { id: number; name: string }) => void;
  handleChangeQuiniela: (idGame: number, team: string) => void;
  handleModalOpen: () => void;
  handleScoreChange: (
    partido: number,
    team: "away" | "home",
    score: number,
  ) => void;
}

export const TeamQuinielaCard = ({
  team,
  game,
  disabled,
  setSelectedTeam,
  handleChangeQuiniela,
  handleModalOpen,
  handleScoreChange,
}: TeamQuinielaCardProps) => {
  const handleSelectedTeam = () => {
    setSelectedTeam({
      id: team === "V" ? game.IdV : game.IdL,
      name: team === "V" ? game.EquipoV : game.EquipoL,
    });
    handleModalOpen();
  };

  return (
    <div className="flex gap-2">
      <div className="grid w-full items-center border border-neutral-400 rounded-lg bg-white">
        <div className="h-full bg-green-100 rounded-lg transition-all duration-500" />
        <div className="flex flex-wrap z-20 w-full p-4 gap-4 justify-between items-center">
          <div className="relative z-10 flex flex-wrap w-1/2 gap-4 justify-start items-center">
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
                <TeamLogo
                  teamName={team === "V" ? game.EquipoV : game.EquipoL}
                />
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

          <div className="text-right">
            <p className="text-xl font-semibold">
              {`${team === "V" ? game.pjeVisitante : game.pjeLocal}%`}
            </p>

            <p className="text-sm text-neutral-500">{`${
              team === "V" ? game.votosVisitante : game.votosLocal
            } votos`}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
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

        {game?.bMarcador && (
          <input
            type="number"
            min="0"
            max="70"
            disabled={disabled}
            value={team === "V" ? game.ID_SCORE_E1 : game.ID_SCORE_E2}
            onChange={(event) => {
              handleScoreChange(
                game.Partido,
                team === "V" ? "away" : "home",
                Number(event.target.value),
              );
            }}
            className={`w-12 h-10 text-2xl text-neutral-600 font-semibold text-center border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
          />
        )}
      </div>
    </div>
  );
};
