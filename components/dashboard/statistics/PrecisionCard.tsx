import { useGetPrecision } from "@/hooks/dashboard/queries/useGetPrecision";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";

export const PrescisionCard = () => {
  const { isPending, isError, data, error } = useGetPrecision();
  const targetInfo = data?.data?.[0]?.Dashboard_1?.[0];
  const porcentWeek = targetInfo?.posicionPeriodo?.pjeSemana || 0;
  const pointsWeek = targetInfo?.posicionPeriodo?.puntosPeriodo || 0;
  const matchesWeek = targetInfo?.posicionPeriodo?.partidosPeriodo || 0;
  const porcentTotal = targetInfo?.posicionTotal?.pjeTemporada || 0;
  const pointsTotal = targetInfo?.posicionTotal?.puntosTemporada || 0;
  const matchesTotal = targetInfo?.posicionTotal?.partidosTemporada || 0;

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

        {isError && <p>Error al cargar los datos...{error?.message}</p>}

        {targetInfo && (
          <div className="grid gap-1">
            <p className="text-2xl font-bold text-neutral-700">
              {`${Math.trunc(porcentWeek)} %`}
            </p>

            <p className="text-xs text-blue-600">
              {`${pointsWeek}/${matchesWeek} correctas`}
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

        {isError && <p>Error al cargar los datos...{error?.message}</p>}

        {targetInfo && (
          <div className="grid gap-1">
            <p className="text-2xl font-bold text-neutral-700">
              {`${Math.trunc(porcentTotal)} %`}
            </p>

            <p className="text-xs text-blue-600">
              {`${pointsTotal}/${matchesTotal} correctas`}
            </p>
          </div>
        )}
      </Card>
    </>
  );
};
