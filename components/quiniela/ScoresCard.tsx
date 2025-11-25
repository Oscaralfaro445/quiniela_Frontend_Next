import { useGetScores } from "@/hooks/scores/queries/useGetScores";

interface CardScoresProps {
  teamId: number;
  teamName: string;
}

interface match {
  lv: string;
  equipo: string;
  scoreE1: number;
  scoreE2: number;
}

export const ScoresCard = ({ teamId, teamName }: CardScoresProps) => {
  const { isPending, isError, isSuccess, error, data } = useGetScores(teamId);

  return (
    <div className="grid gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Marcadores Previos
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      {isPending && <div>Cargando...</div>}

      {isError && <div>Error: {error?.message}</div>}

      {isSuccess && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max bg-white shadow-sm rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-blue-600 text-white text-center text-sm font-semibold">
                <th className="py-3 px-4 border-b border-gray-200">Equipo 1</th>
                <th className="py-3 px-4 border-b border-gray-200">Score 1</th>
                <th className="py-3 px-4 border-b border-gray-200">Score 2</th>
                <th className="py-3 px-4 border-b border-gray-200">Equipo 2</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700 text-sm">
              {data.data.map((match: match, index: number) =>
                match.lv === "L" ? (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2 px-4 border-b border-gray-200 font-medium">
                      {match.equipo}
                    </td>
                    <td
                      className={`py-2 px-4 border-b border-gray-200 font-bold ${
                        match.scoreE2 > match.scoreE1
                          ? ""
                          : "rounded-lg rounded-green-200 bg-green-50 text-green-700"
                      }`}
                    >
                      {match.scoreE1}
                    </td>
                    <td
                      className={`py-2 px-4 border-b border-gray-200 font-bold ${
                        match.scoreE2 > match.scoreE1
                          ? "rounded-lg rounded-green-200 bg-green-50 text-green-700"
                          : ""
                      }`}
                    >
                      {match.scoreE2}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 font-medium">
                      {teamName}
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2 px-4 border-b border-gray-200 font-medium">
                      {teamName}
                    </td>
                    <td
                      className={`py-2 px-4 border-b border-gray-200 font-bold ${
                        match.scoreE1 > match.scoreE2
                          ? "rounded-lg rounded-green-200 bg-green-50 text-green-700"
                          : ""
                      }`}
                    >
                      {match.scoreE1}
                    </td>
                    <td
                      className={`py-2 px-4 border-b border-gray-200 font-bold ${
                        match.scoreE1 > match.scoreE2
                          ? ""
                          : "rounded-lg rounded-green-200 bg-green-50 text-green-700"
                      }`}
                    >
                      {match.scoreE2}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 font-medium">
                      {match.equipo}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
