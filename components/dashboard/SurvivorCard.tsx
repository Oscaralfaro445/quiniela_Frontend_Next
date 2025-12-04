import { useGetSurvivor } from "@/hooks/dashboard/queries/useGetSurvivor";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { Icon } from "../shared/icon/Icon";

export const SurvivorCard = () => {
  const { isPending, isError, isSuccess, data } = useGetSurvivor();
  const equipos = data?.data;

  /* const getGanador = () => {
    if (equipos[0].scoreLocal > equipos[0].scoreVisitante) {
      return "L";
    } else if (equipos[0].scoreLocal < equipos[0].scoreVisitante) {
      return "V";
    } else if (equipos[0].scoreLocal === equipos[0].scoreVisitante) {
      if (equipos[0].scoreLocal === 0 && equipos[0].scoreVisitante === 0) {
        return "P";
      } else {
        return "E";
      }
    }
  }; */

  return (
    <Card>
      <div>
        <p className="text-lg text-blue-600 font-semibold">
          Partido survivor seleccionado
        </p>
        <p className="text-sm text-neutral-600">
          Información del partido de survivor seleccionado
        </p>
      </div>

      {isPending && <p>Cargando...</p>}

      {isError && <p>Error al cargar los datos...</p>}

      {isSuccess && data.data && (
        <div className="flex flex-wrap gap-4 pt-2 ">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <TeamLogo teamName={equipos[0].nombreVisita} />
              <p className="">{equipos[0].scoreVisitante}</p>
            </div>

            <p className="text-xl font-bold text-blue-600">VS</p>

            <div className="flex flex-col items-center">
              <TeamLogo teamName={equipos[0].nombreLocal} />
              <p className="">{equipos[0].scoreLocal}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-between items-start">
            <div className="flex gap-2 justify-between text-sm">
              <Icon className="text-blue-600" name="calendar" />
              <p className="text-neutral-600">{`${equipos[0].fechaPartido}`}</p>
            </div>

            <div className="flex gap-2 justify-between text-sm">
              <Icon className="text-blue-600" name="clock" />
              <p className="text-neutral-600">{`${equipos[0].HORA_PARTIDO}`}</p>
            </div>

            <div className="flex gap-2 justify-between text-sm">
              <Icon className="text-blue-600" name="map-pin" />
              <p className="text-neutral-600">{` ${equipos[0].ESTADIO}`}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
