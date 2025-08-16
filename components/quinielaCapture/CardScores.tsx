import { useState } from "react";
import useGetScores from "@/hooks/scores/queries/useGetScores";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

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

export const CardScores = ({ teamId, teamName }: CardScoresProps) => {
  const mutation = useGetScores();
  const [scoresIsOpen, setScoresIsOpen] = useState(false);

  const handleScores = (teamId: number) => {
    mutation.mutate({ idEquipo: teamId });
    console.log(mutation.data);
    setScoresIsOpen((prev) => !prev);
  };

  return (
    <div className="relative" onClick={() => handleScores(teamId)}>
      <TeamLogo teamName={teamName} />
      {scoresIsOpen && mutation.isSuccess && (
        <div className="absolute top-20 -left-12 z-50 w-52 lg:w-96 p-2 rounded-lg border border-neutral-400 bg-white ">
          <div>
            <div>Marcadores Previos</div>
            {mutation.data.data.map((match: match, index: number) =>
              match.lv === "L" ? (
                <div key={index} className="grid lg:flex gap-2">
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
        </div>
      )}
    </div>
  );
};
