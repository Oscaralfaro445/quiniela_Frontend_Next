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
          <p className="text-md font-medium text-neutral-600">
            Ranking semanal
          </p>
          <Icon className="text-blue-600" name="calendar-search" />
        </div>

        {isPending && <p>Cargando...</p>}

        {isError && <p>Error al cargar los datos...</p>}

        {isSuccess && rankings && (
          <div className="grid gap-1">
            <p className="text-2xl font-bold text-neutral-700">
              {`# ${rankings[0].Dashboard_2[0].posicionPeriodo.posicion}`}
            </p>

            <p className="text-xs text-blue-600">
              {`de ${rankings[0].Dashboard_2[0].totalParticipantes.TotalParticipantes} usuarios`}
            </p>
          </div>
        )}
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-md font-medium text-neutral-600">Ranking global</p>
          <Icon className="text-blue-600" name="trending-up" />
        </div>

        {isPending && <p>Cargando...</p>}

        {isError && <p>Error al cargar los datos...</p>}

        {isSuccess && rankings && (
          <div className="grid gap-1">
            <p className="text-2xl font-bold text-neutral-700">
              {`# ${rankings[0].Dashboard_2[0].posicionTotal.posicion}`}
            </p>

            <p className="text-xs text-blue-600">
              {`de ${rankings[0].Dashboard_2[0].totalParticipantes.TotalParticipantes} usuarios`}
            </p>
          </div>
        )}
      </Card>
    </>
  );
};
