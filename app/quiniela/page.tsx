"use client";

import usePostScores from "@/hooks/scores/mutations/usePostScores";
import usePostMatches from "@/hooks/matches/queries/usePostMatches";
import usePostSurvivorTeams from "@/hooks/survivor/queries/usePostSurvivorTeams";
import { Grid } from "@/components/shared/grid/Grid";
import { InputCombo } from "@/components/shared/input/inputs/InputCombo";

export default function QuinielaPage() {
  const scores = usePostScores();
  const matches = usePostMatches();
  const survivor = usePostSurvivorTeams();

  console.log("Equipos de survivor", survivor?.data?.data);

  const handleOnClick = () => {
    scores.mutate({ idEquipo: 1 });
  };

  return (
    <>
      <InputCombo data={survivor?.data?.data} />
      <Grid gridData={matches?.data?.data[0].quiniela} />
      <Grid gridData={matches?.data?.data[0].bye} />
    </>
  );
}
