import { useGetPrecision } from "@/hooks/dashboard/queries/useGetPrecision";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";

export const PrescisionCard = () => {
  const { isError, isPending, isSuccess, data } = useGetPrecision();

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600">
            Precisión Semanal
          </div>

          <Icon className="text-blue-600" name="target" />
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-gray-900">
              {Math.trunc(
                data.data[0].Dashboard_1[0].posicionPeriodo.pjeSemana
              )}
              %
            </div>

            <span className="text-xs text-gray-600">
              {data.data[0].Dashboard_1[0].posicionPeriodo.puntosPeriodo}/
              {data.data[0].Dashboard_1[0].posicionPeriodo.partidosPeriodo}{" "}
              correctas
            </span>
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600">
            Precisión Global
          </div>

          <Icon className="text-blue-600" name="earth" />
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-gray-900">
              {Math.trunc(
                data.data[0].Dashboard_1[0].posicionTotal.pjeTemporada
              )}
              %
            </div>

            <span className="text-xs text-gray-600">
              {data.data[0].Dashboard_1[0].posicionTotal.puntosTemporada}/
              {data.data[0].Dashboard_1[0].posicionTotal.partidosTemporada}{" "}
              correctas
            </span>
          </div>
        )}
      </Card>
    </>
  );
};
