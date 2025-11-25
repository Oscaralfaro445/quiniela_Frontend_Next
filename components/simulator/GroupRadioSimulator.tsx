import { QuinielaItem } from "@/types/quiniela/quinielaItem";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

interface GroupRadioSimulatorProps {
  disabled: boolean;
  game: QuinielaItem;
  quinielaData: QuinielaItem[];
  handleChangeQuiniela: (idGame: number, team: string) => void;
}

export const GroupRadioSimulator = ({
  disabled,
  game,
  handleChangeQuiniela,
}: GroupRadioSimulatorProps) => {
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

              <div>
                <TeamLogo teamName={game.EquipoV} />
              </div>

              <div>
                <label htmlFor={`game-${game.Partido}`} className="text-md">
                  {game.EquipoV}
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              {game.partGanador === "V" && (
                <Icon className="text-green-600" name="check" size={25} />
              )}
              {game.survEquipoV === "TRUE" && (
                <Icon className="text-red-500" name="swords" size={25} />
              )}
            </div>
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

              <div>
                <TeamLogo teamName={game.EquipoL} />
              </div>

              <div>
                <label htmlFor={`game-${game.Partido}`} className="text-md">
                  {game.EquipoL}
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              {game.partGanador === "L" && (
                <Icon className="text-green-600" name="check" size={25} />
              )}
              {game.survEquipoL === "TRUE" && (
                <Icon className="text-red-500" name="swords" size={25} />
              )}
            </div>
          </div>
        </Card>
      </Card>
    </>
  );
};
