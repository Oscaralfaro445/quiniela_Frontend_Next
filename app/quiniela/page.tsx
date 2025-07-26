"use client";

import usePostScores from "@/hooks/scores/mutations/usePostScores";
import usePostMatches from "@/hooks/matches/queries/usePostMatches";
import usePostSurvivorTeams from "@/hooks/survivor/queries/usePostSurvivorTeams";
import { Grid } from "@/components/grid/Grid";

export default function QuinielaPage() {
  const scoresMutation = usePostScores();
  const matches = usePostMatches();
  const survivorTeamsMutation = usePostSurvivorTeams();

  const handleOnClick = () => {
    scoresMutation.mutate({ idEquipo: 1 });
  };

  return (
    <>
      <Grid gridData={matches?.data?.data[0].quiniela} />
      <Grid gridData={matches?.data?.data[0].bye} />
    </>
  );
}
