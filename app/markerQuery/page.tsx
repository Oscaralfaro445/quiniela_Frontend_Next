"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import usePostMarkers from "@/hooks/markers/queries/usePostMarkers";
import { useAuth } from "@/context/authContext/AuthContext";
import { Icon } from "@/components/shared/icon/Icon";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";

interface GameResult {
  partido: number;
  idEquipo1: number;
  nomEquipo1: string;
  marcVisita: number;
  Equipo2: number;
  nomEquipo2: string;
  marLocal: number;
}

export default function MarkerQueryPage() {
  const { dataUser } = useAuth();
  const week = dataUser?.idPeriodo;
  const markers = usePostMarkers();

  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const totalGames = gameResults.length;

  useEffect(() => {
    if (markers.isSuccess) {
      const gameResults = markers.data.data;
      const initialScores = markers.data.data.map((game: GameResult) => ({
        ID_PERIODO: dataUser?.idPeriodo,
        ID_PARTIDO: game.partido,
        ID_SCORE_E1: game.marcVisita,
        ID_SCORE_E2: game.marLocal,
      }));
      setGameResults(gameResults);
      console.log("Initial scores set:", initialScores);
      console.log("Game results loaded:", gameResults);
    }
  }, [markers.isSuccess, markers.data, dataUser]);

  const getWinner = (partido: number) => {
    const game = gameResults.find((game) => game.partido === partido);

    if (!game) return null;

    if (game.marcVisita > game.marLocal) {
      return game.nomEquipo1;
    } else if (game.marLocal > game.marcVisita) {
      return game.nomEquipo2;
    }

    return null;
  };

  const getTeamAbbr = (teamName: string) => {
    return teamName.split(" ").pop()?.substring(0, 3).toUpperCase() || "TBD";
  };

  const completedGames = gameResults.filter(
    (game) => game.marcVisita !== 0 && game.marLocal !== 0
  ).length;

  const highestScoringGame = gameResults.length
    ? gameResults.reduce((max, game) =>
        game.marcVisita + game.marLocal > max.marcVisita + max.marLocal
          ? game
          : max
      )
    : null;

  return (
    <>
      {markers?.isSuccess && gameResults.length > 0 && (
        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Resultados Semana {week}
                  </h2>
                  <p className="text-gray-600">
                    Marcadores finales de todos los juegos
                  </p>
                </div>
                {/* <Badge variant="outline" className="text-blue-700 border-blue-700">
              </Badge> */}
                <Icon name="check" />
                Finalizada
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-gray-200">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium text-gray-600">
                    Juegos Completados
                  </div>
                  <Icon name="calendar" />
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
                  <Icon name="trophy" />
                </div>
                <div>
                  <></>
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
                  <Icon name="clock" />
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

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Marcadores Finales
              </h3>

              <div className="grid gap-4">
                {gameResults.map((game) => {
                  const winner = getWinner(game.partido);

                  return (
                    <Card
                      key={game.partido}
                      className="border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-700">
                                {game.partido}
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 mx-8">
                            <div className="space-y-3">
                              <div
                                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                                  winner === game.nomEquipo1
                                    ? "border-green-200 bg-green-50"
                                    : "border-gray-200 bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-gray-700">
                                      {getTeamAbbr(game.nomEquipo1)}
                                    </span>
                                  </div>
                                  <div>
                                    <div
                                      className={`font-medium ${
                                        winner === game.nomEquipo1
                                          ? "text-green-800"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {game.nomEquipo1}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      Visitante
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center">
                                  <p
                                    className={`w-16 h-12 text-2xl font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                      winner === game.nomEquipo1
                                        ? "text-green-800 border-green-300 bg-green-50"
                                        : "text-gray-900 border-gray-300 bg-white"
                                    }`}
                                  >
                                    {game.marcVisita}
                                  </p>
                                  {winner === game.nomEquipo1 && (
                                    <Icon name="check" />
                                  )}
                                </div>
                              </div>

                              <div
                                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                                  winner === game.nomEquipo2
                                    ? "border-green-200 bg-green-50"
                                    : "border-gray-200 bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">
                                      {getTeamAbbr(game.nomEquipo2)}
                                    </span>
                                  </div>

                                  <div>
                                    <div
                                      className={`font-medium ${
                                        winner === game.nomEquipo2
                                          ? "text-green-800"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {game.nomEquipo2}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      Local
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <p
                                    className={`w-16 h-12 text-2xl font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                      winner === game.nomEquipo2
                                        ? "text-green-800 border-green-300 bg-green-50"
                                        : "text-gray-900 border-gray-300 bg-white"
                                    }`}
                                  >
                                    {game.marLocal}
                                  </p>
                                  {winner === game.nomEquipo2 && (
                                    <Icon name="check" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">
                              Diferencia
                            </div>
                            {/* <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-800"
                        >
                        </Badge> */}
                            {Math.abs(game.marcVisita - game.marLocal)} pts
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <Link href="/dashboard">
                <Button
                  type="button"
                  title="Volver al Dashboard"
                  theme="normal"
                />
              </Link>

              <Button type="button" title="Actualizar Marcadores" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
