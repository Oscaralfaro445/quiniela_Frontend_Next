"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext/AuthContext";
import usePostParticipantPositions from "@/hooks/participantPositions/queries/usePostParticipantPositions";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { Button } from "@/components/shared/button/Button";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";

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
    <MainContainer>
      <SectionGrid>
        <div className="grid gap-2">
          <Title title="Clasificación" />
          <TextBody
            text="Consulta las posiciones semanales y globales de todos los
          participantes"
          />
        </div>
      </SectionGrid>

      <SectionGrid>
        <div className="grid md:flex gap-4">
          <Card className="border-gray-200">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-600">
                Total Participantes
              </div>
              <Icon name="trophy" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <p className="text-xs text-gray-600">+127 esta semana</p>
            </div>
          </Card>

          <Card className="border-gray-200">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-600">
                Precisión Promedio
              </div>
              <Icon name="target" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">64.2%</div>
              <p className="text-xs text-gray-600">Semana {currentWeek}</p>
            </div>
          </Card>

          <Card className="border-gray-200">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-600">
                Tu Posición
              </div>
              <Icon name="medal" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">#156</div>
              <p className="text-xs text-gray-600">↑ 23 posiciones</p>
            </div>
          </Card>
        </div>
      </SectionGrid>

      <SectionGrid>
        <div className="">
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
      </SectionGrid>

      <SectionGrid>
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "weekly" && (
            <div className="animate-fadeIn">
              <Card className="border-gray-200">
                <div>
                  <div className="flex items-center space-x-2">
                    <Icon name="calendar" />
                    <div className="text-gray-900">
                      Clasificación Semana {currentWeek}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Basada en los aciertos de esta semana
                  </p>
                </div>
                <div>
                  <div className="w-full space-y-4">
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
                </div>
              </Card>
            </div>
          )}

          {activeTab === "global" && (
            <div className="animate-fadeIn">
              <Card className="border-gray-200">
                <div>
                  <div className="flex items-center space-x-2">
                    <Icon name="trophy" />
                    <div className="text-gray-900">Clasificación Global</div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Basada en el rendimiento de toda la temporada
                  </p>
                </div>
                <div>
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
                </div>
              </Card>
            </div>
          )}
        </div>
      </SectionGrid>

      <SectionGrid>
        <div className="grid sm:flex w-full gap-4 justify-center items-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Link href="/quinielaCapture">
            <Button type="button" title="Hacer Quiniela" />
          </Link>
        </div>
      </SectionGrid>
    </MainContainer>
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
