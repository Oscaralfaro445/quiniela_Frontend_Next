import { useGetRanking } from "@/hooks/dashboard/queries/useGetRanking";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";

export const RankingCard = () => {
  const { isPending, isError, isSuccess, data } = useGetRanking();
  const rankings = data?.data;

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

        {isSuccess && rankings && (
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-gray-900">
              #{rankings[0].Dashboard_2[0].posicionPeriodo.posicion}
            </div>

            <p className="text-xs text-gray-600">
              {`de ${rankings[0].Dashboard_2[0].totalParticipantes.TotalParticipantes} usuarios`}
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

        {isSuccess && rankings && (
          <div className="grid gap-1">
            <div className="text-2xl font-bold text-gray-900">
              #{rankings[0].Dashboard_2[0].posicionTotal.posicion}
            </div>

            <p className="text-xs text-gray-600">
              {`de ${rankings[0].Dashboard_2[0].totalParticipantes.TotalParticipantes} usuarios`}
            </p>
          </div>
        )}
      </Card>
    </>
  );
};
