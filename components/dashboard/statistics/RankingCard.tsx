import { useGetRanking } from "@/hooks/dashboard/queries/useGetRanking";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";

export const RankingCard = () => {
  const { isPending, isError, data, error } = useGetRanking();
  const rankingsInfo = data?.data?.[0]?.Dashboard_2?.[0];
  const positionWeek = rankingsInfo?.posicionPeriodo?.posicion || 0;
  const positionTotal = rankingsInfo?.posicionTotal?.posicion || 0;
  const totalParticipants =
    rankingsInfo?.totalParticipantes?.TotalParticipantes || 0;

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

        {isError && <p>Error al cargar los datos... {error?.message}</p>}

        {rankingsInfo && (
          <div className="grid gap-1">
            <p className="text-2xl font-bold text-neutral-700">
              {`# ${positionWeek}`}
            </p>

            <p className="text-xs text-blue-600">
              {`de ${totalParticipants} usuarios`}
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

        {rankingsInfo && (
          <div className="grid gap-1">
            <p className="text-2xl font-bold text-neutral-700">
              {`# ${positionTotal}`}
            </p>

            <p className="text-xs text-blue-600">
              {`de ${totalParticipants} usuarios`}
            </p>
          </div>
        )}
      </Card>
    </>
  );
};
