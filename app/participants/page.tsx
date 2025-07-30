"use client";

import usePostParticipantPositions from "@/hooks/participantPositions/queries/usePostParticipantPositions";
import { Grid } from "@/components/shared/grid/Grid";

export default function ParticipantsPage() {
  const participants = usePostParticipantPositions();
  const data = participants.data?.data[0];

  return (
    <div className="p-4 align-middle inline-block min-w-full">
      <div className="sm:rounded-lg">
        <Grid gridData={data?.puntosPeriodo} />
      </div>

      <div className="overflow-x-auto sm:rounded-lg">
        <Grid gridData={data?.puntosTotal} />
      </div>
    </div>
  );
}
