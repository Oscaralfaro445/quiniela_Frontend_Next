"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useGetMarkers from "@/hooks/markers/queries/useGetMarkers";
import usePostMarkersMutation from "@/hooks/markers/mutations/usePostMarkersMutation";
import { useAuth } from "@/context/authContext/AuthContext";
import { GameResult } from "@/types/gameResult/gameResult";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { Icon } from "@/components/shared/icon/Icon";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { TeamLogo } from "@/components/shared/teamLogo/TeamLogo";

export default function MarkerCapturePage() {
  const { dataUser } = useAuth();
  const week = dataUser?.idPeriodo;
  const { isSuccess, data } = useGetMarkers();
  const markersUpdate = usePostMarkersMutation();

  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const totalGames = gameResults?.length || 1;

  useEffect(() => {
    if (isSuccess) {
      const gameResults = data.data;
      setGameResults(gameResults);
    }
  }, [isSuccess, data, dataUser]);

  const handleScoreChange = (
    partido: number,
    team: "away" | "home",
    value: string
  ) => {
    const numValue = Number.parseInt(value) || 0;

    setGameResults((prevScores) =>
      prevScores.map((game) =>
        game.partido === partido
          ? {
              ...game,
              [team === "away" ? "marcVisita" : "marLocal"]: numValue,
            }
          : game
      )
    );
  };

  const handleSubmitScores = () => {
    if (!dataUser?.idPeriodo) {
      console.error("No se pueden enviar los marcadores");
      return;
    }

    const gameResultsUpdated = gameResults.map((game: GameResult) => ({
      ID_PERIODO: dataUser?.idPeriodo,
      ID_PARTIDO: game.partido,
      ID_SCORE_E1: game.marcVisita,
      ID_SCORE_E2: game.marLocal,
    }));
    console.log("Marcadores a enviar:", gameResultsUpdated);
    markersUpdate.mutate(gameResultsUpdated);
    console.log("Marcadores enviados:", markersUpdate.data);
  };

  const getWinner = (partido: number) => {
    const game = gameResults.find((game) => game.partido === partido);

    if (!game) return null;

    if (game.marcVisita > game.marLocal) {
      return { team: game.nomEquipo1, isHome: false };
    } else if (game.marLocal > game.marcVisita) {
      return { team: game.nomEquipo2, isHome: true };
    }
    return null;
  };

  const getTeamAbbr = (teamName: string) => {
    return teamName.split(" ").pop()?.substring(0, 3).toUpperCase() || "TBD";
  };

  const completedGames = gameResults?.filter(
    (game) => game.marcVisita !== 0 && game.marLocal !== 0
  ).length;

  const highestScoringGame = gameResults?.length
    ? gameResults.reduce((max, game) =>
        game.marcVisita + game.marLocal > max.marcVisita + max.marLocal
          ? game
          : max
      )
    : null;

  return (
    <ProtectedRoute>
      <section className="pt-18">
        <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
          <div className="grid gap-2">
            <Title title={`Resultados Semana ${week}`} />
            <TextBody text="Marcadores finales de todos los juegos" />
          </div>

          <div className="flex h-fit justify-center items-center border-2 border-blue-600 rounded-2xl">
            <p className="px-2 py-1 text-sm font-semibold text-blue-700">
              NFL temporada 2025
            </p>
          </div>
        </div>
      </section>

      {gameResults && (
        <section>
          <div className="grid lg:flex max-w-[1280px] mx-auto px-10 py-8 gap-4">
            <Card className="border-gray-200">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-gray-600">
                  Juegos Completados
                </div>
                <Icon className="text-blue-600" name="calendar" />
              </div>

              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {completedGames}/{totalGames}
                </div>
                <p className="text-xs text-gray-600">Semana {week}</p>
              </div>
            </Card>

            <Card className="border-gray-200">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-gray-600">
                  Mayor Anotación
                </div>
                <Icon className="text-blue-600" name="trophy" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {highestScoringGame
                    ? highestScoringGame.marcVisita +
                      highestScoringGame.marLocal
                    : 0}
                </div>
                <p className="text-xs text-gray-600">
                  {highestScoringGame
                    ? `${getTeamAbbr(
                        highestScoringGame.nomEquipo1
                      )} vs ${getTeamAbbr(highestScoringGame.nomEquipo2)}`
                    : ""}
                </p>
              </div>
            </Card>

            <Card className="border-gray-200">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-gray-600">
                  Promedio de Puntos
                </div>
                <Icon className="text-blue-600" name="clock" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    gameResults.reduce(
                      (sum, game) => sum + game.marcVisita + game.marLocal,
                      0
                    ) / totalGames
                  )}
                </div>
                <p className="text-xs text-gray-600">Por juego</p>
              </div>
            </Card>
          </div>
        </section>
      )}

      {isSuccess && gameResults && (
        <section>
          <div className="grid max-w-[1280px] mx-auto px-10 py-8 gap-4">
            {gameResults.map((game) => {
              const winner = getWinner(game.partido);

              return (
                <Card
                  key={game.partido}
                  className="border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4 items-center justify-between">
                    <div className="flex w-8 h-8 items-center justify-center bg-blue-100 rounded-full">
                      <span className="text-sm font-bold text-blue-700">
                        {game.partido}
                      </span>
                    </div>

                    <div className="grid w-full items-center gap-4">
                      <div
                        className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                          winner && !winner.isHome
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <TeamLogo
                            className="transform scale-75 lg:scale-100"
                            teamName={game.nomEquipo1}
                          />

                          <div className="hidden sm:block">
                            <span className="font-medium">
                              {game.nomEquipo1}
                            </span>

                            <div className="text-sm text-gray-500">
                              Visitante
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="number"
                            min="0"
                            max="99"
                            value={game.marcVisita}
                            onChange={(event) =>
                              handleScoreChange(
                                game.partido,
                                "away",
                                event.target.value
                              )
                            }
                            className={`w-16 h-12 text-2xl font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              winner && !winner.isHome
                                ? "text-green-800 border-green-300 bg-green-50"
                                : "text-gray-900 border-gray-300 bg-white"
                            }`}
                          />
                        </div>
                      </div>

                      <div
                        className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                          winner && winner.isHome
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <TeamLogo
                            className="transform scale-75 lg:scale-100"
                            teamName={game.nomEquipo2}
                          />

                          <div className="hidden sm:block">
                            <span className="font-medium">
                              {game.nomEquipo2}
                            </span>

                            <div className="text-sm text-gray-500">Local</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            max="70"
                            value={game.marLocal}
                            onChange={(event) =>
                              handleScoreChange(
                                game.partido,
                                "home",
                                event.target.value
                              )
                            }
                            className={`w-16 h-12 text-2xl font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              winner && winner.isHome
                                ? "text-green-800 border-green-300 bg-green-50"
                                : "text-gray-900 border-gray-300 bg-white"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">
                        Diferencia
                      </div>
                      {Math.abs(game.marcVisita - game.marLocal)} pts
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button
            type="submit"
            title="Actualizar Marcadores"
            onClick={handleSubmitScores}
          />
        </div>
      </section>
    </ProtectedRoute>
  );
}
