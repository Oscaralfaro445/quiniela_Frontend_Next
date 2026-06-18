import { useGetMatchVotes } from "@/hooks/queries/useGetMatchVotes";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

export const MatchVotesCard = () => {
  const { isPending, isError, data } = useGetMatchVotes();
  const matchVotes = data?.data;
  const normalizePercentage = (value: number | string | undefined): number => {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      return 0;
    }
    return Math.min(Math.max(numeric, 0), 100);
  };
  const formatPercentage = (value: number | string | undefined) =>
    `${normalizePercentage(value).toFixed(1)}%`;

  if (isPending) {
    return <p>Cargando votos de los partidos...</p>;
  } else if (isError) {
    return <p>Error al cargar los votos de los partidos.</p>;
  }

  return (
    <div className="lg:col-span-2">
      <Card>
        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
            Panel de tendencias
          </p>
          <p className="text-2xl font-bold leading-tight">
            Votos de los partidos
          </p>
          <p className="text-sm text-white/80">
            Seguimiento en tiempo real de la preferencia de la comunidad
          </p>
        </div>

        {matchVotes ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-neutral-100 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  <th className="px-4 py-3 rounded-tl-lg">Visitante</th>
                  <th className="px-4 py-3">Local</th>
                  <th className="px-4 py-3 text-center">Votos visitante</th>
                  <th className="px-4 py-3 text-center">Votos local</th>
                  <th className="px-4 py-3 text-center rounded-tr-lg">
                    Distribucion
                  </th>
                </tr>
              </thead>
              <tbody className="rounded-b-lg bg-white shadow-sm">
                {matchVotes?.map(({ idPartido, ...match }) => (
                  <tr
                    key={idPartido}
                    className="even:bg-neutral-50 transition-colors hover:bg-blue-50/70"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white p-1 shadow">
                          <TeamLogo teamName={match.nomVisitante} />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-800">
                            {match.nomVisitante}
                          </p>
                          <p className="text-xs uppercase tracking-wide text-neutral-500">
                            Visitante
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white p-1 shadow">
                          <TeamLogo teamName={match.nomLocal} />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-800">
                            {match.nomLocal}
                          </p>
                          <p className="text-xs uppercase tracking-wide text-neutral-500">
                            Local
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                        {match.votosVisitante}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                        {match.votosLocal}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                            <span>Visitante</span>
                            <span className="text-blue-700">
                              {formatPercentage(match.pjeVisitante)}
                            </span>
                          </div>
                          <div className="mt-1 h-2 rounded-full bg-blue-100">
                            <span
                              className="block h-full rounded-full bg-blue-500"
                              style={{
                                width: `${normalizePercentage(match.pjeVisitante)}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                            <span>Local</span>
                            <span className="text-indigo-700">
                              {formatPercentage(match.pjeLocal)}
                            </span>
                          </div>
                          <div className="mt-1 h-2 rounded-full bg-indigo-100">
                            <span
                              className="block h-full rounded-full bg-indigo-500"
                              style={{
                                width: `${normalizePercentage(match.pjeLocal)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-2 text-neutral-600">No hay votos que mostrar</p>
        )}
      </Card>
    </div>
  );
};
