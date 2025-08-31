import { useGetSurvivor } from "@/hooks/dashboard/queries/useGetSurvivor";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { Icon } from "../shared/icon/Icon";

export const SurvivorCard = () => {
  const { isPending, isError, isSuccess, data } = useGetSurvivor();
  console.log("SurvivorCard data:", data);

  return (
    <>
      <Card className="border-neutral-200">
        <div className="flex flex-col">
          <span className="text-lg text-blue-700 font-semibold">
            Partido Survivor Seleccionado
          </span>
          <span className="text-sm text-gray-600">
            Información del partido de survivor seleccionado
          </span>
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
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
                <span>{`Ganador: ${
                  data.data[0].localVisitante === "V"
                    ? data.data[0].nombreVisitante
                    : data.data[0].nombreLocal
                } `}</span>
              </div>
            </div>

            <div className="grid md:flex">
              <div className="flex w-1/2 justify-start items-center gap-4">
                <div className="flex flex-col items-center">
                  <TeamLogo teamName={data.data[0].nombreVisita} />
                  <span>{data.data[0].scoreVisitante}</span>
                </div>

                <span>vs</span>

                <div className="flex flex-col items-center">
                  <TeamLogo teamName={data.data[0].nombreLocal} />
                  <span>{data.data[0].scoreLocal}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-between items-start">
                <div className="flex gap-2 justify-between text-sm">
                  <Icon className="text-blue-600" name="calendar" />
                  <span className="text-gray-600">{`Fecha: ${data.data[0].fechaPartido}`}</span>
                </div>

                <div className="flex gap-2 justify-between text-sm">
                  <Icon className="text-blue-600" name="clock" />
                  <span className="text-gray-600">{`Hora: ${data.data[0].HORA_PARTIDO}`}</span>
                </div>

                <div className="flex gap-2 justify-between text-sm">
                  <Icon className="text-blue-600" name="map-pin" />
                  <span className="text-gray-600">{`Estadio: ${data.data[0].ESTADIO}`}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </>
  );
};
