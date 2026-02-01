import { useGetSurvivor } from "@/hooks/dashboard/queries/useGetSurvivor";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { Card } from "../shared/card/Card";
import { Icon } from "../shared/icon/Icon";

export const SurvivorCard = () => {
  const { isPending, isError, data, error } = useGetSurvivor();
  const teamsInfo = data?.data?.[0];

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

      {isError && <p>Error al cargar los datos... {error?.message}</p>}

      {teamsInfo && (
        <div className="flex flex-wrap gap-4 pt-2 ">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <TeamLogo teamName={teamsInfo?.nombreVisita} />
              <p className="">{teamsInfo?.scoreVisitante}</p>
            </div>

            <p className="text-xl font-bold text-blue-600">VS</p>

            <div className="flex flex-col items-center">
              <TeamLogo teamName={teamsInfo?.nombreLocal} />
              <p className="">{teamsInfo?.scoreLocal}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-between items-start">
            <div className="flex gap-2 justify-between text-sm">
              <Icon className="text-blue-600" name="calendar" />
              <p className="text-neutral-600">{`${teamsInfo?.fechaPartido}`}</p>
            </div>

            <div className="flex gap-2 justify-between text-sm">
              <Icon className="text-blue-600" name="clock" />
              <p className="text-neutral-600">{`${teamsInfo?.HORA_PARTIDO}`}</p>
            </div>

            <div className="flex gap-2 justify-between text-sm">
              <Icon className="text-blue-600" name="map-pin" />
              <p className="text-neutral-600">{` ${teamsInfo?.ESTADIO}`}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
