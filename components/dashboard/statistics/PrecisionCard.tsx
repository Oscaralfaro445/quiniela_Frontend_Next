import { useGetPrecision } from "@/hooks/dashboard/queries/useGetPrecision";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";

export const PrescisionCard = () => {
  const { isError, isPending, isSuccess, data } = useGetPrecision();
  const target = data?.data;

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-md font-medium text-neutral-600">
            Precisión semanal
          </p>
          <Icon className="text-blue-600" name="target" />
        </div>

        {isPending && <p>Cargando...</p>}

        {isError && <p>Error al cargar los datos...</p>}

        {isSuccess && target && (
          <div className="grid gap-1">
            <p className="text-2xl font-bold text-neutral-700">
              {`${Math.trunc(
                target[0]?.Dashboard_1[0]?.posicionPeriodo?.pjeSemana
              )} %`}
            </p>

            <p className="text-xs text-blue-600">
              {`${target[0]?.Dashboard_1[0]?.posicionPeriodo?.puntosPeriodo}/${target[0]?.Dashboard_1[0]?.posicionPeriodo?.partidosPeriodo}`}
              correctas
            </p>
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-md font-medium text-neutral-600">
            Precisión global
          </p>
          <Icon className="text-blue-600" name="earth" />
        </div>

        {isPending && <p>Cargando...</p>}

        {isError && <p>Error al cargar los datos...</p>}

        {isSuccess && target && (
          <div className="grid gap-1">
            <p className="text-2xl font-bold text-neutral-700">
              {`${Math.trunc(
                data.data[0].Dashboard_1[0].posicionTotal.pjeTemporada
              )} %`}
            </p>

            <p className="text-xs text-blue-600">
              {`${target[0].Dashboard_1[0].posicionTotal.puntosTemporada}/${target[0].Dashboard_1[0].posicionTotal.partidosTemporada}`}
              correctas
            </p>
          </div>
        )}
      </Card>
    </>
  );
};
