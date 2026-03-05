import { useGetMatchVotes } from "@/hooks/queries/useGetMatchVotes";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

export const MatchVotesCard = () => {
  const { isPending, isError, data } = useGetMatchVotes();
  const matchVotes = data?.data;

  if (isPending) {
    return <p>Cargando votos de los partidos...</p>;
  } else if (isError || !matchVotes) {
    return <p>Error al cargar los votos de los partidos.</p>;
  }

  return (
    <div className="grid col-span-2">
      <Card>
        <div className="pb-2">
          <p className="text-lg text-blue-600 font-semibold">
            Votos de los partidos
          </p>
          <p className=" text-sm text-neutral-600"></p>
        </div>

        <table className="table-auto bg-neutral-100">
          <thead className="bg-blue-600">
            <tr className="text-white">
              <th className="text-left px-4 py-2 border-b">Visitante</th>
              <th className="text-left px-4 py-2 border-b">Local</th>
              <th className="px-4 py-2 border-b">Votos visitante</th>
              <th className="px-4 py-2 border-b">Votos local</th>
              <th className="px-4 py-2 border-b">% Visitante</th>
              <th className="px-4 py-2 border-b">% Local</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {matchVotes?.map(({ idPartido, ...match }) => (
              <tr key={idPartido} className="hover:bg-neutral-200">
                <td className="px-4 py-2">
                  <TeamLogo teamName={match.nomVisitante} />
                </td>
                <td className="px-4 py-2">
                  <TeamLogo teamName={match.nomLocal} />
                </td>
                <td className="text-center px-4 py-2">
                  {match.votosVisitante}
                </td>
                <td className="text-center px-4 py-2">{match.votosLocal}</td>
                <td className="text-center px-4 py-2">{`${match.pjeVisitante} %`}</td>
                <td className="text-center px-4 py-2">{`${match.pjeLocal} %`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
