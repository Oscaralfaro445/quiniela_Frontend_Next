import { useGetRanking } from "@/hooks/dashboard/queries/useGetRanking";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";

export const RankingCard = () => {
  const { isPending, isError, isSuccess, data } = useGetRanking();
  console.log("Ranking info", data);

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600">
            Ranking Semanal
          </div>

          <Icon className="text-blue-600" name="calendar-search" />
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-gray-900">
              #{data.data[0].Dashboard_2[0].posicionPeriodo.puntos}
            </div>

            <p className="text-xs text-gray-600">
              {`de ${data.data[0].Dashboard_2[0].totalParticipantes.TotalParticipantes}  usuarios`}
            </p>

            <p className="text-xs text-gray-600">
              {`con ${data.data[0].Dashboard_2[0].posicionPeriodo.puntos}  puntos`}
            </p>
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600">
            Ranking Global
          </div>

          <Icon className="text-blue-600" name="trending-up" />
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-gray-900">
              #{data.data[0].Dashboard_2[0].posicionTotal.posicion}
            </div>

            <p className="text-xs text-gray-600">
              {`de ${data.data[0].Dashboard_2[0].totalParticipantes.TotalParticipantes}  usuarios`}
            </p>

            <p className="text-xs text-gray-600">
              {`con ${data.data[0].Dashboard_2[0].posicionTotal.puntos}  puntos`}
            </p>
          </div>
        )}
      </Card>
    </>
  );
};
