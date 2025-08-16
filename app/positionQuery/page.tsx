"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext/AuthContext";
import usePostParticipantPositions from "@/hooks/participantPositions/queries/usePostParticipantPositions";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { Button } from "@/components/shared/button/Button";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";

type TabType = "weekly" | "global";

interface ParticipantData {
  Secuencia: number;
  ID_QUINIELA: number;
  ID_PARTICIPANTE: number;
  periodo: string;
  Nombre: string;
  Puntos: number;
}

export default function PositionQueryPage() {
  const router = useRouter();
  const { dataUser } = useAuth();
  const participants = usePostParticipantPositions();
  const data = participants.data?.data[0];
  const currentWeek = dataUser?.idPeriodo;
  const weeklyLeaderboard: ParticipantData[] = data?.puntosPeriodo;
  const globalLeaderboard: ParticipantData[] = data?.puntosTotal;
  const [activeTab, setActiveTab] = useState<TabType>("weekly");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Icon name="crown" className="text-yellow-500" />;
      case 2:
        return <Icon name="medal" className="text-gray-500" />;
      case 3:
        return <Icon name="award" className="text-orange-500" />;
      default:
        return (
          <span className="text-lg font-semibold text-gray-700">#{rank}</span>
        );
    }
  };

  const getNameAbbr = (teamName: string) => {
    return teamName.split(" ").map((word) => word.charAt(0).toUpperCase());
  };

  return (
    <ProtectedRoute>
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
                <Icon name="trophy" className="text-blue-700" />
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
                <Icon name="target" className="text-blue-700" />
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
                <Icon name="medal" className="text-blue-700" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">#156</div>
                <p className="text-xs text-gray-600">↑ 23 posiciones</p>
              </div>
            </Card>
          </div>
        </SectionGrid>

        <SectionGrid>
          <div className="flex lg:w-96 h-12 p-1 rounded-md bg-neutral-100">
            <button
              className={`w-1/2 p-1 rounded-md transition-colors duration-100 cursor-pointer ${
                activeTab === "weekly" ? "bg-white" : ""
              }`}
              type="button"
              onClick={() => setActiveTab("weekly")}
            >
              Semana {currentWeek}
            </button>

            <button
              className={`w-1/2 p-1 rounded-lg transition-colors duration-100 cursor-pointer ${
                activeTab === "global" ? "bg-white" : ""
              }`}
              type="button"
              onClick={() => setActiveTab("global")}
            >
              Global
            </button>
          </div>
        </SectionGrid>

        <SectionGrid>
          <div className="transition-all duration-300 ease-in-out">
            {activeTab === "weekly" && (
              <div className="animate-fadeIn">
                <Card>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="text-gray-900">
                        Clasificación Semana {currentWeek}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Basada en los aciertos de esta semana
                    </p>
                  </div>

                  <div className="grid w-full gap-2">
                    {weeklyLeaderboard?.map((player: ParticipantData) => (
                      <div
                        key={player.Secuencia}
                        className={`flex p-4 items-center justify-between rounded-lg border transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
                          player.Secuencia <= 3
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10">
                            {getRankIcon(player.Secuencia)}
                          </div>

                          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {getNameAbbr(player.Nombre)}
                            </span>
                          </div>

                          <div className="font-medium text-gray-900">
                            {player.Nombre}
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span className="text-xs text-gray-500">
                            {player.Puntos} puntos
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "global" && (
              <div className="animate-fadeIn">
                <Card className="border-gray-200">
                  <div>
                    <div className="text-gray-900">Clasificación Global</div>
                    <p className="text-sm text-gray-600">
                      Basada en el rendimiento de toda la temporada
                    </p>
                  </div>

                  <div className="grid w-full gap-2">
                    {globalLeaderboard?.map((player: ParticipantData) => (
                      <div
                        key={player.Secuencia}
                        className={`flex p-4 items-center justify-between rounded-lg border transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
                          player.Secuencia <= 3
                            ? "bg-blue-50 border-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10">
                            {getRankIcon(player.Secuencia)}
                          </div>

                          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {getNameAbbr(player.Nombre)}
                            </span>
                          </div>

                          <div className="font-medium text-gray-700">
                            {player.Nombre}
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500">
                              {player.Puntos} puntos
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </SectionGrid>

        <SectionGrid>
          <div className="grid lg:flex w-full gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button
                type="button"
                title="Volver al Dashboard"
                theme="normal"
              />
            </Link>

            <Button
              type="button"
              title="Hacer Quiniela"
              onClick={() => router.push("/quinielaCapture")}
            />
          </div>
        </SectionGrid>
      </MainContainer>
    </ProtectedRoute>
  );
}

{
  /* <div className="border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("weekly")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === "weekly"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
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
        </div> */
}
