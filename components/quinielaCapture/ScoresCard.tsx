import useGetScores from "@/hooks/scores/queries/useGetScores";

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
    <div className="grid gap-2 justify-center">
      <p>Marcadores Previos</p>
      {isPending && <div>Cargando...</div>}

      {isError && <div>Error: {error?.message}</div>}

      {isSuccess && (
        <table>
          <thead>
            <tr>
              <th>Equipo 1</th>
              <th>Score 1</th>
              <th>Score 2</th>
              <th>Equipo 2</th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((match: match, index: number) =>
              match.lv === "L" ? (
                <tr key={index} className="flex gap-2">
                  <td>{match.equipo}</td>
                  <td>{match.scoreE1}</td>
                  <td>{match.scoreE2}</td>
                  <td>{teamName}</td>
                </tr>
              ) : (
                <tr key={index} className="flex gap-2">
                  <td>{teamName}</td>
                  <td>{match.scoreE1}</td>
                  <td>{match.scoreE2}</td>
                  <td>{match.equipo}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
