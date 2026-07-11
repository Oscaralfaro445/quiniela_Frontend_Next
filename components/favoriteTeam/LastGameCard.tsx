"use client";

import { useGetFavoriteTeam } from "@/hooks/queries/favoriteTeam/useGetFavoriteTeam";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

export const LastGameCard = () => {
  const { isPending, isError, isSuccess, data } = useGetFavoriteTeam();
  const game = data?.data?.[0]?.infPartidos?.filter(
    (game: {
      nomEquipo1: string;
      nomEquipo2: string;
      idScoreE1: number;
      idScoreE2: number;
      fPartido: string;
      bActual: boolean;
    }) => game.bActual,
  )?.[0];

  return (
    <div className="">
      <Card>
        <div className="grid gap-4">
          <div>
            <p className="text-lg text-blue-600 font-semibold">
              Último juego de tu equipo favorito
            </p>
          </div>

          {isPending && <p>Cargando...</p>}

          {isError && (
            <p>Error al cargar el último juego de tu equipo favorito.</p>
          )}

          {isSuccess &&
            (game ? (
              <Card>
                <div className="hover:shadow-md transition-shadow space-y-4">
                  <div className="flex gap-4 items-center justify-between">
                    <div className="grid w-full items-center gap-4">
                      <div
                        className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors border-neutral-300`}
                      >
                        <div className="flex items-center gap-2">
                          <TeamLogo teamName={game?.nomEquipo1 || ""} />

                          <div className="hidden sm:block">
                            <p className="font-medium">
                              {game?.nomEquipo1 || ""}
                            </p>
                            <p className="text-sm text-gray-600">Visitante</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <p className="w-12 h-12 text-2xl text-neutral-600 font-bold text-center border-2 rounded-lg border-neutral-300">
                            {game?.idScoreE1}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors border-neutral-300`}
                      >
                        <div className="flex items-center gap-2">
                          <TeamLogo teamName={game?.nomEquipo2 || ""} />

                          <div className="hidden sm:block">
                            <p className="font-medium">
                              {game?.nomEquipo2 || ""}
                            </p>
                            <p className="text-sm text-gray-600">Local</p>
                          </div>
                        </div>

                        <p className="w-12 h-12 text-2xl text-neutral-600 font-bold text-center border-2 rounded-lg border-neutral-300">
                          {game?.idScoreE2}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:block text-center">
                      <p className="text-sm text-neutral-600">Diferencia</p>
                      <p className="text-sm text-neutral-600">{`${Math.abs(
                        game?.idScoreE1 - game?.idScoreE2 || 0,
                      )} pts`}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <p>No hay información disponible.</p>
            ))}
        </div>
      </Card>
    </div>
  );
};
