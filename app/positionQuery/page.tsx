"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext/AuthContext";
import usePostParticipantPositions from "@/hooks/participantPositions/queries/usePostParticipantPositions";
import { Card } from "@/components/shared/card/Card";
import { CardHeader } from "@/components/shared/cardHeader/CardHeader";
import { CardTitle } from "@/components/shared/cardTitle/CardTitle";
import { Icon } from "@/components/shared/icon/Icon";
import { CardContent } from "@/components/shared/cardContent/CardContent";
import { Button } from "@/components/shared/button/Button";

interface Player {
  Secuencia: number;
  Nombre: string;
  username?: string;
  correctPicks?: number;
  totalPicks?: number;
  accuracy?: number;
  rank?: number;
  previousRank?: number;
  change?: string;
  weeklyRank?: number;
  streak?: number;
}

type TabType = "weekly" | "global";

export default function PositionQueryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly");
  const { dataUser } = useAuth();
  const currentWeek = dataUser?.idPeriodo;
  const participants = usePostParticipantPositions();
  const data = participants.data?.data[0];
  const weeklyLeaderboard = data?.puntosPeriodo;
  const globalLeaderboard = data?.puntosTotal;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Icon name="crown" />;
      case 2:
        return <Icon name="crown" />;
      case 3:
        return <Icon name="crown" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <Icon name="trending-up" />;
      case "down":
        return <Icon name="trending-down" />;
      default:
        return <Icon name="minus" />;
    }
  };

  /* const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 70) return "text-green-600 bg-green-50";
    if (accuracy >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  }; */

  return (
    <div className="bg-white">
      <div className="px-4 py-8">
        <div className="">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Clasificación
          </h2>
          <p className="text-gray-600">
            Consulta las posiciones semanales y globales de todos los
            participantes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Participantes
              </CardTitle>
              <Icon name="trophy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <p className="text-xs text-gray-600">+127 esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Precisión Promedio
              </CardTitle>
              <Icon name="target" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">64.2%</div>
              <p className="text-xs text-gray-600">Semana {currentWeek}</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tu Posición
              </CardTitle>
              <Icon name="medal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">#156</div>
              <p className="text-xs text-gray-600">↑ 23 posiciones</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("weekly")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "weekly"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="calendar" />
                  <span>Semana {currentWeek}</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("global")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "global"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="trophy" />
                  <span>Global</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "weekly" && (
            <div className="animate-fadeIn">
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Icon name="calendar" />
                    <CardTitle className="text-gray-900">
                      Clasificación Semana {currentWeek}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">
                    Basada en los aciertos de esta semana
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyLeaderboard?.map((player: Player) => (
                      <div
                        key={player.Secuencia}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
                          player.Secuencia <= 3
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10">
                            {getRankIcon(player.Secuencia)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {player.Nombre}
                            </div>
                            <div className="text-sm text-gray-500">
                              {player.username}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">
                              0/10
                            </div>
                            <div className="text-xs text-gray-500">
                              Aciertos
                            </div>
                          </div>

                          <div className="text-center">
                            {/* Badge placeholder */}
                          </div>

                          <div className="flex items-center space-x-1">
                            {getChangeIcon(player.change || "same")}
                            {player.change !== "same" && (
                              <span className="text-xs text-gray-500">
                                {Math.abs(
                                  (player.rank || 0) -
                                    (player.previousRank || 0)
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "global" && (
            <div className="animate-fadeIn">
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Icon name="trophy" />
                    <CardTitle className="text-gray-900">
                      Clasificación Global
                    </CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">
                    Basada en el rendimiento de toda la temporada
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {globalLeaderboard?.map((player: Player) => (
                      <div
                        key={player.Secuencia}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
                          player.Secuencia <= 3
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-10 h-10">
                            {getRankIcon(player.Secuencia)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {player.Nombre}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">
                              {player.correctPicks}/{player.totalPicks}
                            </div>
                            <div className="text-xs text-gray-500">Total</div>
                          </div>
                          <div className="text-center">
                            {/* Badge placeholder */}
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">
                              #{player.weeklyRank}
                            </div>
                            <div className="text-xs text-gray-500">
                              Esta semana
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">
                              {(player.streak || 0) > 0
                                ? `🔥 ${player.streak}`
                                : "-"}
                            </div>
                            <div className="text-xs text-gray-500">Racha</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Link href="/dashboard">
            <Button type="button" title="Hacer Quiniela" theme="normal" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* "use client";

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
 */
