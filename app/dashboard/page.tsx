"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext/AuthContext";
import { Button } from "@/components/shared/button/Button";
import { Card } from "@/components/shared/card/Card";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { Icon } from "@/components/shared/icon/Icon";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";

export default function Dashboard() {
  const router = useRouter();
  const { dataUser } = useAuth();
  const currentWeek = dataUser?.idPeriodo;

  const userStats = {
    correctPicks: 45,
    totalPicks: 70,
    accuracy: 64,
    rank: 156,
    totalUsers: 2847,
  };

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

  const upcomingGames = [
    { team1: "Packers", team2: "Bears", time: "Dom 1:00 PM" },
    { team1: "49ers", team2: "Seahawks", time: "Dom 4:25 PM" },
    { team1: "Ravens", team2: "Steelers", time: "Lun 8:15 PM" },
  ];

  return (
    <ProtectedRoute>
      <MainContainer>
        <SectionGrid>
          <div className="grid md:flex w-full gap-4 justify-center md:justify-between items-center">
            <div className="grid gap-2">
              <Title title={`¡Bienvenido de vuelta!`} />
              <TextBody text="Aquí tienes un resumen de tu rendimiento en la temporada." />
            </div>

            <div className="flex justify-center items-center border-2 border-blue-600 rounded-2xl">
              <p className="px-2 py-1 text-sm font-semibold text-blue-700">
                NFL temporada 2025
              </p>
            </div>
          </div>
        </SectionGrid>

        <SectionGrid>
          <div className="grid lg:flex w-full gap-4">
            <Card>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">
                  Precisión
                </div>
                <Icon name="target" />
              </div>

              <div className="grid gap-1">
                <div className="text-2xl font-bold text-gray-900">
                  {userStats.accuracy}%
                </div>

                <p className="text-xs text-gray-600">
                  {userStats.correctPicks}/{userStats.totalPicks} correctas
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">Ranking</div>
                <Icon name="trending-up" />
              </div>

              <div className="grid gap-1">
                <div className="text-2xl font-bold text-gray-900">
                  #{userStats.rank}
                </div>

                <p className="text-xs text-gray-600">
                  de {userStats.totalUsers.toLocaleString()} usuarios
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">
                  Semana Actual
                </div>
                <Icon name="calendar" />
              </div>

              <div className="grid gap-1">
                <div className="text-2xl font-bold text-gray-900">
                  Semana {currentWeek}
                </div>

                <p className="text-xs text-gray-600">3 juegos pendientes</p>
              </div>
            </Card>
          </div>
        </SectionGrid>

        <SectionGrid>
          <div className="grid w-full lg:grid-cols-2 gap-4">
            <Card>
              <div className="grid w-full">
                <span className="text-gray-900">Acciones Rápidas</span>
                <span>Gestiona tus quinielas de la semana</span>
              </div>

              <Button
                type="button"
                title={`Hacer Quiniela Semana ${currentWeek}`}
                icon="play"
                onClick={() => router.push("/quinielaCapture")}
              />

              <div className="grid lg:grid-cols-2 gap-4">
                <div className="grid w-full gap-4">
                  <Button
                    type="button"
                    title="Clasificación"
                    theme="normal"
                    onClick={() => router.push("/positionQuery")}
                  />
                  <Button
                    type="button"
                    title={`Resultados Semana ${currentWeek}`}
                    theme="normal"
                    onClick={() => router.push("/markerQuery")}
                  />
                </div>

                <div className="grid gap-4">
                  <Button
                    type="button"
                    title="Survivor"
                    theme="normal"
                    onClick={() => router.push("/survivorQuery")}
                  />
                  <Button
                    type="button"
                    title="Activar Survivor"
                    theme="normal"
                    onClick={() => router.push("/captures/survivorActivation")}
                  />
                </div>
              </div>
            </Card>

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
                        {/*  <Badge
                        variant={game.correct ? "default" : "destructive"}
                        className={
                          game.correct ? "bg-green-100 text-green-800" : ""
                        }
                        >
                        {game.correct ? "Correcto" : "Incorrecto"}
                        </Badge> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="border-gray-200">
              <div>
                <div className="text-gray-900">Progreso de la Temporada</div>
                <div>Tu rendimiento general</div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Precisión General</span>
                    <span className="font-medium text-gray-900">
                      {userStats.accuracy}%
                    </span>
                  </div>
                  {/*                 <Progress value={userStats.accuracy} className="h-2" />
                   */}{" "}
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Juegos Completados</span>
                    <span className="font-medium text-gray-900">
                      {userStats.totalPicks}/112
                    </span>
                  </div>
                  {/* <Progress
                  value={(userStats.totalPicks / 112) * 100}
                  className="h-2"
                /> */}
                </div>
              </div>
            </Card>

            <Card className="border-gray-200">
              <div>
                <div className="text-gray-900">Próximos Juegos</div>
                <div>Semana {currentWeek} - Pendientes por predecir</div>
              </div>

              <div className="grid w-full gap-4">
                <div className="space-y-3">
                  {upcomingGames.map((game, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {game.team1} vs {game.team2}
                      </div>
                      <div className="text-sm text-gray-600">{game.time}</div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  title="Hacer Predicciones"
                  onClick={() => router.push("/quinielaCapture")}
                />
              </div>
            </Card>
          </div>
        </SectionGrid>
      </MainContainer>
    </ProtectedRoute>
  );
}
