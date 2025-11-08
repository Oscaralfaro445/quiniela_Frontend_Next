import { useGetSurvivor } from "@/hooks/dashboard/queries/useGetSurvivor";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { Icon } from "../shared/icon/Icon";

export const SurvivorCard = () => {
  const { isPending, isError, isSuccess, data } = useGetSurvivor();
  console.log("survivor data", data);
  const getGanador = () => {
    if (data.data[0].scoreLocal > data.data[0].scoreVisitante) {
      return `Ganador: ${data.data[0].nombreLocal}`;
    } else if (data.data[0].scoreLocal < data.data[0].scoreVisitante) {
      return `Ganador: ${data.data[0].nombreVisita}`;
    } else if (data.data[0].scoreLocal === data.data[0].scoreVisitante) {
      if (data.data[0].scoreLocal === 0 && data.data[0].scoreVisitante === 0) {
        return "Partido pendiente";
      } else {
        return "Ganador: partido empatado";
      }
    }
  };

  return (
    <>
      <Card className="border-neutral-200">
        <div className="flex flex-col">
          <p className="text-lg text-blue-700 font-semibold">
            Partido Survivor Seleccionado
          </p>
          <p className="text-sm text-gray-600">
            Información del partido de survivor seleccionado
          </p>
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && data.data && (
          <>
            <div className="flex justify-start">
              <div
                className={`px-4 py-1 border rounded-2xl ${
                  data.data[0].nombreEquipo ===
                  (data.data[0].localVisitante === "V"
                    ? data.data[0].nombreVisitante
                    : data.data[0].nombreLocal)
                    ? "border-green-600 bg-green-100 text-green-700"
                    : "border-red-600 bg-red-100 text-red-700"
                }`}
              >
                <span>{getGanador()}</span>
              </div>
            </div>

            <div className="grid sm:flex">
              <div className="flex w-1/2 justify-start items-center gap-4">
                <div className="flex flex-col items-center">
                  <TeamLogo teamName={data.data[0].nombreVisita} />
                  <p>{data.data[0].scoreVisitante}</p>
                </div>

                <p>vs</p>

                <div className="flex flex-col items-center">
                  <TeamLogo teamName={data.data[0].nombreLocal} />
                  <p>{data.data[0].scoreLocal}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-between items-start">
                <div className="flex gap-2 justify-between text-sm">
                  <Icon className="text-blue-600" name="calendar" />
                  <p className="text-gray-600">{`${data.data[0].fechaPartido}`}</p>
                </div>

                <div className="flex gap-2 justify-between text-sm">
                  <Icon className="text-blue-600" name="clock" />
                  <p className="text-gray-600">{`${data.data[0].HORA_PARTIDO}`}</p>
                </div>

                <div className="flex gap-2 justify-between text-sm">
                  <Icon className="text-blue-600" name="map-pin" />
                  <p className="text-gray-600">{` ${data.data[0].ESTADIO}`}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </>
  );
};
