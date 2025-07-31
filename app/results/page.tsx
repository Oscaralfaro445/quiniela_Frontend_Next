"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext/AuthContext";
import { Button } from "@/components/shared/button/Button";
import { Icon } from "@/components/shared/icon/Icon";
import { Card } from "@/components/shared/ui/card/Card";
import { CardHeader } from "@/components/shared/ui/cardHeader/CardHeader";
import { CardTitle } from "@/components/shared/ui/cardTitle/CardTitle";
import { CardContent } from "@/components/shared/ui/cardContent/CardContent";

export default function WeekResults() {
  const { dataUser } = useAuth();
  const week = dataUser?.idPeriodo;

  const gameResults = [
    {
      partido: 1,
      idEquipo1: 9,
      nomEquipo1: "Philadelphia Eagles",
      marcVisita: 18,
      Equipo2: 11,
      nomEquipo2: "Washington Commanders",
      marLocal: 28,
    },
    {
      partido: 2,
      idEquipo1: 24,
      nomEquipo1: "Chicago Bears",
      marcVisita: 20,
      Equipo2: 22,
      nomEquipo2: "Green Bay Packers",
      marLocal: 19,
    },
    {
      partido: 3,
      idEquipo1: 32,
      nomEquipo1: "Detroit Lions",
      marcVisita: 6,
      Equipo2: 4,
      nomEquipo2: "Jacksonville Jaguars",
      marLocal: 52,
    },
    {
      partido: 4,
      idEquipo1: 15,
      nomEquipo1: "Tennessee Titans",
      marcVisita: 13,
      Equipo2: 6,
      nomEquipo2: "Minnesota Vikings",
      marLocal: 23,
    },
    {
      partido: 5,
      idEquipo1: 31,
      nomEquipo1: "Miami Dolphins",
      marcVisita: 6,
      Equipo2: 29,
      nomEquipo2: "Las Vegas Raiders",
      marLocal: 52,
    },
    {
      partido: 6,
      idEquipo1: 10,
      nomEquipo1: "New England Patriots",
      marcVisita: 22,
      Equipo2: 8,
      nomEquipo2: "Los Angeles Rams",
      marLocal: 28,
    },
    {
      partido: 7,
      idEquipo1: 3,
      nomEquipo1: "New Orleans Saints",
      marcVisita: 35,
      Equipo2: 13,
      nomEquipo2: "Cleveland Browns",
      marLocal: 14,
    },
    {
      partido: 8,
      idEquipo1: 7,
      nomEquipo1: "Pittsburgh Steelers",
      marcVisita: 18,
      Equipo2: 30,
      nomEquipo2: "Baltimore Ravens",
      marLocal: 16,
    },
    {
      partido: 9,
      idEquipo1: 5,
      nomEquipo1: "Denver Broncos",
      marcVisita: 38,
      Equipo2: 19,
      nomEquipo2: "Atlanta Falcons",
      marLocal: 6,
    },
    {
      partido: 10,
      idEquipo1: 26,
      nomEquipo1: "San Francisco 49ers",
      marcVisita: 17,
      Equipo2: 16,
      nomEquipo2: "Seattle Seahawks",
      marLocal: 20,
    },
    {
      partido: 11,
      idEquipo1: 14,
      nomEquipo1: "Buffalo Bills",
      marcVisita: 30,
      Equipo2: 12,
      nomEquipo2: "Kansas City Chiefs",
      marLocal: 21,
    },
    {
      partido: 12,
      idEquipo1: 28,
      nomEquipo1: "Los Angeles Chargers",
      marcVisita: 27,
      Equipo2: 2,
      nomEquipo2: "Cincinnati Bengals",
      marLocal: 24,
    },
    {
      partido: 13,
      idEquipo1: 21,
      nomEquipo1: "New York Jets",
      marcVisita: 27,
      Equipo2: 23,
      nomEquipo2: "Indianapolis Colts",
      marLocal: 28,
    },
    {
      partido: 14,
      idEquipo1: 1,
      nomEquipo1: "Dallas Cowboys",
      marcVisita: 10,
      Equipo2: 20,
      nomEquipo2: "Houston Texans",
      marLocal: 34,
    },
  ];

  // Estado para manejar los marcadores editables
  const [gameScores, setGameScores] = useState(() => {
    const initialScores: Record<
      number,
      { marcVisita: number; marLocal: number }
    > = {};
    gameResults.forEach((game) => {
      initialScores[game.partido] = {
        marcVisita: game.marcVisita,
        marLocal: game.marLocal,
      };
    });
    console.log("Initial game scores:", initialScores);
    return initialScores;
  });

  const [hasChanges, setHasChanges] = useState(false);

  // Función para manejar cambios en los marcadores
  const handleScoreChange = (
    partido: number,
    team: "away" | "home",
    value: string
  ) => {
    const numValue = Number.parseInt(value) || 0;
    setGameScores((prev) => ({
      ...prev,
      [partido]: {
        ...prev[partido],
        [team === "away" ? "marcVisita" : "marLocal"]: numValue,
      },
    }));
    setHasChanges(true);
  };

  // Función para guardar cambios
  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar en la base de datos
    console.log("Guardando cambios:", gameScores);
    setHasChanges(false);
    // Mostrar mensaje de éxito o hacer llamada a API
  };

  // Función para determinar el ganador usando valores actuales
  const getWinner = (partido: number) => {
    const scores = gameScores[partido];
    if (!scores) return null;

    const game = gameResults.find((g) => g.partido === partido); // Find the original game data
    if (!game) return null;

    if (scores.marcVisita > scores.marLocal) {
      return { team: game.nomEquipo1, isHome: false };
    } else if (scores.marLocal > scores.marcVisita) {
      return { team: game.nomEquipo2, isHome: true };
    }
    return null;
  };

  // Función para obtener abreviación del equipo
  const getTeamAbbr = (teamName: string) => {
    return teamName.split(" ").pop()?.substring(0, 3).toUpperCase() || "TBD";
  };

  // Estadísticas de la semana
  const totalGames = gameResults.length;
  const completedGames = gameResults.filter(
    (game) => game.marcVisita !== null && game.marLocal !== null
  ).length;
  const highestScoringGame = gameResults.reduce((max, game) =>
    game.marcVisita + game.marLocal > max.marcVisita + max.marLocal ? game : max
  );

  return (
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
              <CheckCircle className="mr-1 h-3 w-3" />
              </Badge> */}
            Finalizada
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Juegos Completados
              </CardTitle>
              <Icon name="calendar" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {completedGames}/{totalGames}
              </div>
              <p className="text-xs text-gray-600">Semana {week}</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Mayor Anotación
              </CardTitle>
              <Icon name="trophy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {highestScoringGame.marcVisita + highestScoringGame.marLocal}
              </div>
              <p className="text-xs text-gray-600">
                {getTeamAbbr(highestScoringGame.nomEquipo1)} vs{" "}
                {getTeamAbbr(highestScoringGame.nomEquipo2)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Promedio de Puntos
              </CardTitle>
              <Icon name="clock" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(
                  gameResults.reduce(
                    (sum, game) => sum + game.marcVisita + game.marLocal,
                    0
                  ) / totalGames
                )}
              </div>
              <p className="text-xs text-gray-600">Por juego</p>
            </CardContent>
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
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      {/* Game Number */}
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-700">
                            {game.partido}
                          </span>
                        </div>
                      </div>

                      {/* Teams and Scores */}
                      <div className="flex-1 mx-8">
                        <div className="space-y-3">
                          {/* Away Team */}
                          <div
                            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                              winner && !winner.isHome
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
                                    winner && !winner.isHome
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
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                min="0"
                                max="99"
                                value={
                                  gameScores[game.partido]?.marcVisita || 0
                                }
                                onChange={(e) =>
                                  handleScoreChange(
                                    game.partido,
                                    "away",
                                    e.target.value
                                  )
                                }
                                className={`w-16 h-12 text-2xl font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                  winner && !winner.isHome
                                    ? "text-green-800 border-green-300 bg-green-50"
                                    : "text-gray-900 border-gray-300 bg-white"
                                }`}
                              />
                              {winner && !winner.isHome && (
                                <Icon name="check" />
                              )}
                            </div>
                          </div>

                          {/* Home Team */}
                          <div
                            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                              winner && winner.isHome
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
                                    winner && winner.isHome
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
                              <input
                                type="number"
                                min="0"
                                max="99"
                                value={gameScores[game.partido]?.marLocal || 0}
                                onChange={(e) =>
                                  handleScoreChange(
                                    game.partido,
                                    "home",
                                    e.target.value
                                  )
                                }
                                className={`w-16 h-12 text-2xl font-bold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                  winner && winner.isHome
                                    ? "text-green-800 border-green-300 bg-green-50"
                                    : "text-gray-900 border-gray-300 bg-white"
                                }`}
                              />
                              {winner && winner.isHome && <Icon name="check" />}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Final Score Summary */}
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">
                          Diferencia
                        </div>
                        {/* <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-800"
                        >
                        </Badge> */}
                        {Math.abs(
                          (gameScores[game.partido]?.marcVisita || 0) -
                            (gameScores[game.partido]?.marLocal || 0)
                        )}{" "}
                        pts
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button
            type="submit"
            title="Actualizar Marcadores"
            onClick={handleSaveChanges}
          />
        </div>
      </div>
    </div>
  );
}
