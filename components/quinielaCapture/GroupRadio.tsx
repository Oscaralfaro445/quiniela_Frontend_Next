import { QuinielaItem, QuinielaWeekTeam } from "@/app/quinielaCapture/page";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";

interface GroupRadioProps {
  game: QuinielaWeekTeam;
  quinielaData: QuinielaItem[];
  handleChangeQuiniela: (idGame: number, team: string) => void;
}

const getTeamAbbr = (teamName: string) => {
  return teamName.split(" ").pop()?.substring(0, 3).toUpperCase() || "TBD";
};

export const GroupRadio = ({
  game,
  quinielaData,
  handleChangeQuiniela,
}: GroupRadioProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow" key={game.Partido}>
      <div className="flex w-full gap-4 justify-start items-center">
        <Icon name="clock" size={18} />
        <p className="text-sm">{game.Fecha}</p>
        <Icon name="map-pin" size={18} />
        <p className="text-sm">{game.Estadio}</p>
      </div>

      <Card>
        <div className="flex w-full justify-between items-center">
          <div className="flex w-full justify-start items-center gap-2">
            <input
              type="radio"
              name={`game-${game.Partido}`}
              id={`game-${game.Partido}`}
              value={game.IdV}
              disabled={false}
              checked={quinielaData.some(
                (item) =>
                  item.ID_PARTIDO === game.Partido &&
                  item.CVE_GANADOR === game.EquipoV
              )}
              onChange={() => handleChangeQuiniela(game.Partido, game.EquipoV)}
            />

            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-700">
                {getTeamAbbr(game.EquipoV)}
              </span>
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

      <Card>
        <div className="flex w-full justify-between items-center">
          <div className="flex w-full justify-start items-center gap-2">
            <input
              type="radio"
              name={`game-${game.Partido}`}
              id={`game-${game.Partido}`}
              value={game.IdL}
              disabled={false}
              checked={quinielaData.some(
                (item) =>
                  item.ID_PARTIDO === game.Partido &&
                  item.CVE_GANADOR === game.EquipoL
              )}
              onChange={() => handleChangeQuiniela(game.Partido, game.EquipoL)}
            />

            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {getTeamAbbr(game.EquipoL)}
              </span>
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
  );
};
