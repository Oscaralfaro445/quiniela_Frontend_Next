"use client";

import usePostScores from "@/hooks/scores/mutations/usePostScores";
import usePostMatches from "@/hooks/matches/queries/usePostMatches";
import usePostSurvivorTeams from "@/hooks/survivor/queries/usePostSurvivorTeams";
import { useAuth } from "@/context/AuthContext";

export default function QuinielaPage() {
  const { token, dataUser } = useAuth();
  const matches = usePostMatches(dataUser);
  const scoresMutation = usePostScores();
  const survivorTeamsMutation = usePostSurvivorTeams(dataUser);

  const handleOnClick = () => {
    if (token) {
      scoresMutation.mutate({ idEquipo: 1 });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-20">
        <button
          className="cursor-pointer rounded-2xl border border-blue-600 w-fit"
          onClick={() => handleOnClick()}
        >
          Ejecutar las mutations
        </button>
        <h1>Partidos</h1>
        {matches.isSuccess && matches.data && (
          <ul>
            {matches.data.data?.[0]?.quiniela?.map(
              (partido: any, index: number) => (
                <li key={index} className="cursor-pointer">
                  {index + 1}. {partido.idPartido} - {partido.idEquipo1}{" "}
                  {partido.equipo1} {partido.idEquipo2} {partido.equipo2}{" "}
                  {partido.F_PARTIDO} {partido.HORA_PARTIDO} {partido.ESTADIO}
                  pts
                </li>
              )
            )}
          </ul>
        )}

        <h1>Descanso</h1>
        {matches.isSuccess && matches.data && (
          <ul>
            {matches.data.data?.[0]?.bye?.map(
              (participante: any, index: number) => (
                <li key={index}>
                  {index + 1}. {participante.idEquipo} -{" "}
                  {participante.nomEquipo}
                </li>
              )
            )}
          </ul>
        )}

        <h1>Resultados</h1>
        {scoresMutation.isSuccess && scoresMutation.data && (
          <ul>
            {scoresMutation.data.data.map(
              (participante: any, index: number) => (
                <li key={index}>
                  {participante.lv} {participante.equipo} -{" "}
                  {participante.scoreE1} {participante.scoreE2}
                </li>
              )
            )}
          </ul>
        )}

        <h1>Survivor Teams</h1>
        {survivorTeamsMutation.isSuccess && survivorTeamsMutation.data && (
          <ul>
            {survivorTeamsMutation.data.data.map(
              (participante: any, index: number) => (
                <li key={index}>
                  {participante.llave} {participante.valor}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
}
