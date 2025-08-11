"use client";

import Link from "next/link";
import { useAuth } from "@/context/authContext/AuthContext";
import { Button } from "@/components/shared/button/Button";
import { Card } from "@/components/shared/card/Card";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { Icon } from "@/components/shared/icon/Icon";

export default function Dashboard() {
  const { dataUser } = useAuth();

  // Datos de ejemplo
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
    <MainContainer>
      <SectionGrid>
        <div className="grid w-full gap-2 justify-items-center content-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de vuelta!
          </h2>

          <p className="text-gray-600">
            Aquí tienes un resumen de tu rendimiento en la temporada.
          </p>
        </div>
      </SectionGrid>

      <SectionGrid>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-gray-200">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-600">Precisión</div>
              <Icon name="target" />
            </div>

            <div>
              <div className="text-2xl font-bold text-gray-900">
                {userStats.accuracy}%
              </div>

              <p className="text-xs text-gray-600">
                {userStats.correctPicks}/{userStats.totalPicks} correctas
              </p>
            </div>
          </Card>

          <Card className="border-gray-200">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-600">Ranking</div>
              <Icon name="trending-up" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                #{userStats.rank}
              </div>
              <p className="text-xs text-gray-600">
                de {userStats.totalUsers.toLocaleString()} usuarios
              </p>
            </div>
          </Card>

          <Card className="border-gray-200">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-600">
                Semana Actual
              </div>
              <Icon name="calendar" />
              {/* <Calendar className="h-4 w-4 text-blue-700" /> */}
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                Semana {currentWeek}
              </div>
              <p className="text-xs text-gray-600">3 juegos pendientes</p>
            </div>
          </Card>

          <Card className="border-gray-200">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-600">
                Ligas Activas
              </div>
              <Icon name="users" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <p className="text-xs text-gray-600">2 públicas, 1 privada</p>
            </div>
          </Card>
        </div>
      </SectionGrid>

      <SectionGrid>
        <div className="grid w-full lg:grid-cols-2 gap-8">
          <Card className="border-gray-200">
            <div>
              <div className="text-gray-900">Acciones Rápidas</div>
              <div>Gestiona tus quinielas de la semana</div>
            </div>

            <div className="space-y-4">
              <Link href="/quinielaCapture">
                <Button
                  type="button"
                  title={`Hacer Quiniela Semana ${currentWeek}`}
                />
                <Icon name="play" />
              </Link>

              <div className="grid grid-cols-2 gap-4">
                <Link href="/">
                  <Button type="button" title="Ver Ligas" theme="normal" />
                </Link>

                <Link href="/">
                  <Button type="button" title="Clasificación" theme="normal" />
                </Link>
              </div>
            </div>
          </Card>

          <Card className="border-gray-200">
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
            <div>
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
              <Link href="/">
                <Button type="button" title="Hacer Predicciones" />
              </Link>
            </div>
          </Card>
        </div>
      </SectionGrid>
    </MainContainer>
  );
}
