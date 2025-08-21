"use client";

import { useAuth } from "@/context/authContext/AuthContext";
import { Card } from "@/components/shared/card/Card";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { Timer } from "@/components/shared/timer/Timer";
import { SwiftActionsCard } from "@/components/dashboard/SwiftActionsCard";
import { UpcomingGamesCard } from "@/components/dashboard/UpcomingGamesCard";

export default function Dashboard() {
  const { dataUser } = useAuth();
  const currentWeek = dataUser?.idPeriodo;

  const recentGames = [
    {
      team1: "Chiefs",
      team2: "Raiders",
      prediction: "Chiefs",
      result: "Chiefs",
      correct: true,
    },
    {
      team1: "Bills",
      team2: "Dolphins",
      prediction: "Bills",
      result: "Dolphins",
      correct: false,
    },
    {
      team1: "Cowboys",
      team2: "Giants",
      prediction: "Cowboys",
      result: "Cowboys",
      correct: true,
    },
  ];

  return (
    <ProtectedRoute>
      <section className="pt-18">
        <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
          <div className="grid gap-2 justify-items-start items-center">
            <Title
              className="text-center"
              title={`¡Bienvenido de vuelta ${dataUser?.nombre}!`}
            />
            <TextBody
              className="text-center"
              text="Aquí tienes un resumen de tu rendimiento en la temporada."
            />
          </div>

          <div className="flex h-fit justify-center items-center border-2 border-blue-600 rounded-2xl">
            <p className="px-2 py-1 text-sm font-semibold text-blue-700">
              NFL temporada 2025
            </p>
          </div>
        </div>
      </section>

      <StatisticsCard currentWeek={currentWeek ?? ""} />

      <Timer />

      <section>
        <div className="grid lg:grid-cols-2 w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 ">
          <SwiftActionsCard currentWeek={currentWeek ?? ""} />

          <Card>
            <div>
              <div className="text-gray-900">Rendimiento Reciente</div>
              <div>Tus últimas predicciones</div>
            </div>

            <div>
              <div className="space-y-3">
                {recentGames.map((game, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-900">
                        {game.team1} vs {game.team2}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        Elegiste: {game.prediction}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2 border-neutral-200">
            <div>
              <div className="text-gray-900">Progreso de la Temporada</div>
              <div>Tu rendimiento general</div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Precisión General</span>
                  <span className="font-medium text-gray-900">{64}%</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Juegos Completados</span>
                  <span className="font-medium text-gray-900">{100}/112</span>
                </div>
              </div>
            </div>
          </Card>

          <UpcomingGamesCard currentWeek={currentWeek ?? ""} />
        </div>
      </section>
    </ProtectedRoute>
  );
}
