"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext/AuthContext";
import { useGetParticipantPositions } from "@/hooks/participantPositions/queries/useGetParticipantPositions";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { Button } from "@/components/shared/button/Button";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { StatisticsCard } from "@/components/positionQuery/StatisticsCard";
import { HeaderPage } from "@/components/ui/headerPage/HeaderPage";

type TabType = "weekly" | "global";

export interface ParticipantData {
  Posicion: number;
  ID_QUINIELA: number;
  ID_PARTICIPANTE: number;
  periodo: string;
  Nombre: string;
  Puntos: number;
}

export default function PositionQueryPage() {
  const router = useRouter();
  const { dataUser } = useAuth();
  const { isPending, isError, isSuccess, data } = useGetParticipantPositions();
  const participantData = data?.data[0];
  const currentWeek = dataUser?.idPeriodo;
  const weeklyLeaderboard: ParticipantData[] = participantData?.puntosPeriodo;
  const globalLeaderboard: ParticipantData[] = participantData?.puntosTotal;
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
      <div className="pt-18">
        <HeaderPage
          title="Clasificación"
          text="Consulta las posiciones semanales y globales de todos los participantes"
        />

        <StatisticsCard activeTab={activeTab} />

        <section>
          <div className="grid max-w-[1280px] mx-auto px-10 py-8 gap-4">
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
                      <p className="text-md text-gray-600">
                        Basada en los aciertos de esta semana
                      </p>
                    </div>

                    {isPending && (
                      <div className="flex gap-2 justify-center items-center">
                        <p>Cargando información...</p>
                        <Icon
                          name="loader"
                          className="animate-spin h-5 w-5 text-blue-500"
                        />
                      </div>
                    )}

                    {isError && (
                      <div className="flex gap-2 justify-center items-center">
                        <p>Error al cargar información</p>
                        <Icon
                          name="alert-triangle"
                          className="h-5 w-5 text-red-500"
                        />
                      </div>
                    )}

                    {isSuccess && (
                      <div className="grid w-full gap-2">
                        {weeklyLeaderboard?.map(
                          (player: ParticipantData, index) => (
                            <div
                              key={index}
                              className={`flex p-4 items-center justify-between rounded-lg border transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
                                player.Posicion <= 3
                                  ? "bg-blue-50 border-blue-200"
                                  : "border-gray-200"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10">
                                  {getRankIcon(player.Posicion)}
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
                                <span className="text-lg font-semibold text-gray-500">
                                  {player.Puntos} puntos
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </Card>
                </div>
              )}

              {activeTab === "global" && (
                <div className="animate-fadeIn">
                  <Card className="border-gray-200">
                    <div>
                      <div className="text-gray-900">Clasificación Global</div>
                      <p className="text-md text-gray-600">
                        Basada en el rendimiento de toda la temporada
                      </p>
                    </div>

                    {isPending && (
                      <div className="flex justify-center items-center mt-10">
                        <Icon
                          name="loader"
                          className="animate-spin h-5 w-5 text-blue-500"
                        />
                      </div>
                    )}

                    {isError && (
                      <div className="flex justify-center items-center mt-10">
                        <Icon
                          name="alert-triangle"
                          className="h-5 w-5 text-red-500"
                        />
                      </div>
                    )}

                    {isSuccess && (
                      <div className="grid w-full gap-2">
                        {globalLeaderboard?.map(
                          (player: ParticipantData, index) => (
                            <div
                              key={index}
                              className={`flex p-4 items-center justify-between rounded-lg border transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
                                player.Posicion <= 3
                                  ? "bg-blue-50 border-blue-200"
                                  : "border-gray-200"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10">
                                  {getRankIcon(player.Posicion)}
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
                                  <span className="text-lg font-semibold text-gray-500">
                                    {player.Puntos} puntos
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </Card>
                </div>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
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
        </section>
      </div>
    </ProtectedRoute>
  );
}
