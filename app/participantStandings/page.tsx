"use client";

import useParticipantStandings from "@/hooks/participantStandings/mutations/useParticipantStandings";
import { useEffect } from "react";

export default function ParticipantStandingsPage() {
  const mutation = useParticipantStandings();

  useEffect(() => {
    mutation.mutate();
  }, []);

  console.log(mutation.data.data[0].puntosPeriodo);

  return (
    <>
      {mutation.isSuccess && <>{mutation.data[0]?.puntosPeriodo}</>}

      <div>
        <h1>Posiciones de los Participantes</h1>
        {mutation.isSuccess && mutation.data && (
          <ul>
            {mutation.data.data?.[0]?.puntosPeriodo.map(
              (participante: any, index: number) => (
                <li key={index}>
                  {index + 1}. {participante.Nombre} - {participante.Puntos} pts
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
}
