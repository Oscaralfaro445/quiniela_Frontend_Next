"use client";

import { useGetFavoriteTeam } from "@/hooks/queries/favoriteTeam/useGetFavoriteTeam";
import { Card } from "../shared/card/Card";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";

export const UpcomingGamesCard = () => {
  const { isPending, isError, isSuccess, data } = useGetFavoriteTeam();
  const games = data?.data?.[0]?.infPartidos?.filter(
    (game: {
      nomEquipo1: string;
      nomEquipo2: string;
      idScoreE1: number;
      idScoreE2: number;
      fPartido: string;
      bActual: boolean;
    }) => !game.bActual,
  );

  return (
    <div className="">
      <Card>
        <div className="grid gap-4">
          <div>
            <p className="text-lg text-blue-600 font-semibold">
              Próximos juegos de tu equipo favorito
            </p>
          </div>

          {isPending && <p>Cargando...</p>}

          {isError && (
            <p>Error al cargar el último juego de tu equipo favorito.</p>
          )}

          {isSuccess && games ? (
            <div className="grid h-[500px] gap-4 overflow-y-auto">
              {games &&
                games.map(
                  (
                    game: {
                      nomEquipo1: string;
                      nomEquipo2: string;
                      idScoreE1: number;
                      idScoreE2: number;
                      fPartido: string;
                      bActual: boolean;
                    },
                    index: number,
                  ) => (
                    <Card key={index}>
                      <div className="hover:shadow-md transition-shadow space-y-4">
                        <div className="flex gap-4 items-center justify-between">
                          <div className="flex w-full gap-4 items-center justify-between">
                            <div
                              className={`flex w-1/3 p-3 items-center justify-start rounded-lg  transition-colors`}
                            >
                              <div className="flex items-center gap-2">
                                <TeamLogo teamName={game?.nomEquipo1 || ""} />

                                <div className="hidden sm:block">
                                  <p className="font-medium">
                                    {game?.nomEquipo1 || ""}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Visitante
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center"></div>
                            </div>

                            <p className="font-bold text-lg">VS</p>

                            <div
                              className={`flex w-1/3 p-3 items-center justify-end rounded-lg transition-colors`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="text-end hidden sm:block">
                                  <p className="font-medium">
                                    {game?.nomEquipo2 || ""}
                                  </p>
                                  <p className="text-sm text-gray-600">Local</p>
                                </div>
                                <TeamLogo teamName={game?.nomEquipo2 || ""} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ),
                )}
            </div>
          ) : (
            <p>No hay información disponible.</p>
          )}
        </div>
      </Card>
    </div>
  );
};
