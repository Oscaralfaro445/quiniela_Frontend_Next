import { useGetPrecision } from "@/hooks/dashboard/queries/useGetPrecision";
import { Card } from "../shared/card/Card";

export const SeasonProgressCard = () => {
  const { isPending, isError, isSuccess, data } = useGetPrecision();

  return (
    <>
      <Card className="border-neutral-200">
        <div>
          <div className="text-gray-900">Progreso de la Temporada</div>
          <div>Tu rendimiento general</div>
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Precisión General</span>
              <span className="font-medium text-gray-900">
                {Math.trunc(
                  data.data[0].Dashboard_1[0].posicionTotal.pjeTemporada
                )}
                %
              </span>
            </div>

            <progress
              className="w-full"
              max={100}
              value={Math.trunc(
                data.data[0].Dashboard_1[0].posicionTotal.pjeTemporada
              )}
            />

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Juegos Completados</span>
                <span className="font-medium text-gray-900">
                  {data.data[0].Dashboard_1[0].posicionTotal.puntosTemporada}/
                  {data.data[0].Dashboard_1[0].posicionTotal.partidosTemporada}
                </span>
              </div>
            </div>

            <progress
              className="w-full"
              max={100}
              value={Number(
                (data.data[0].Dashboard_1[0].posicionTotal.puntosTemporada *
                  100) /
                  data.data[0].Dashboard_1[0].posicionTotal.partidosTemporada
              )}
            />
          </div>
        )}
      </Card>
    </>
  );
};
