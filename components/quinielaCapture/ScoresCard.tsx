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
    <div>
      <span>Marcadores Previos</span>
      {isPending && <div>Cargando...</div>}

      {isError && <div>Error: {error?.message}</div>}

      {isSuccess &&
        data.data.map((match: match, index: number) =>
          match.lv === "L" ? (
            <div key={index} className="flex gap-2">
              {match.equipo}
              <div>{match.scoreE1}</div>

              <div>{match.scoreE2}</div>
              <div>{teamName}</div>
            </div>
          ) : (
            <div key={index} className="flex gap-2">
              <div>{teamName}</div>
              <div>{match.scoreE1}</div>

              <div>{match.scoreE2}</div>
              <div>{match.equipo}</div>
            </div>
          )
        )}
    </div>
  );
};
