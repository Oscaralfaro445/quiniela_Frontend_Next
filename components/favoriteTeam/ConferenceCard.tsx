"use client";

import { useGetFavoriteTeam } from "@/hooks/queries/favoriteTeam/useGetFavoriteTeam";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

export const ConferenceCard = () => {
  const { isPending, isError, isSuccess, data } = useGetFavoriteTeam();
  const conference = data?.data?.[0]?.infPosicion;
  console.log("conference", conference);

  return (
    <div className="items-start">
      <Card>
        <div className="grid gap-4">
          <div>
            <p className="text-lg text-blue-600 font-semibold">
              Conferencia de la NFL
            </p>
            <p className=" text-sm text-neutral-600">Temporada 2025-2026</p>
          </div>

          {isPending && <p>Cargando...</p>}

          {isError && (
            <p>Error al cargar el último juego de tu equipo favorito.</p>
          )}

          {isSuccess && conference ? (
            <div className="w-full">
              <table className="w-full">
                <thead className="bg-neutral-100">
                  <tr className="text-left font-semibold">
                    <th className="w-1/2">{conference?.[0]?.division}</th>
                    <th>Ganados</th>
                    <th>Perdidos</th>
                    <th>Empatados</th>
                  </tr>
                </thead>

                <tbody>
                  {conference?.map(
                    (equipo: {
                      nomEquipo: string;
                      division: string;
                      numGanados: number;
                      numPerdidos: number;
                      numEmpatados: number;
                    }) => (
                      <tr key={equipo.nomEquipo}>
                        <td className="flex gap-2 items-center">
                          <TeamLogo teamName={equipo?.nomEquipo} />

                          <p className="hidden sm:block">{equipo.nomEquipo}</p>
                        </td>
                        <td>{equipo.numGanados}</td>
                        <td>{equipo.numPerdidos}</td>
                        <td>{equipo.numEmpatados}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  G = Ganados • P = Perdidos • E = Empatados
                </p>
              </div>
            </div>
          ) : (
            <p>No hay información disponible.</p>
          )}
        </div>
      </Card>
    </div>
  );
};
