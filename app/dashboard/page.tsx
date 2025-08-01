"use client";

import Link from "next/link";
import { useAuth } from "@/context/authContext/AuthContext";
import { Button } from "@/components/shared/button/Button";
import { Card } from "@/components/shared/card/Card";
import { CardHeader } from "@/components/shared/cardHeader/CardHeader";
import { CardTitle } from "@/components/shared/cardTitle/CardTitle";
import { CardContent } from "@/components/shared/cardContent/CardContent";
import { Icon } from "@/components/shared/icon/Icon";
import { CardDescription } from "@/components/shared/cardDescription/CardDescription";

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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de vuelta!
          </h2>
          <p className="text-gray-600">
            Aquí tienes un resumen de tu rendimiento en la temporada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Precisión
              </CardTitle>
              <Icon name="target" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {userStats.accuracy}%
              </div>
              <p className="text-xs text-gray-600">
                {userStats.correctPicks}/{userStats.totalPicks} correctas
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ranking
              </CardTitle>
              <Icon name="trending-up" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                #{userStats.rank}
              </div>
              <p className="text-xs text-gray-600">
                de {userStats.totalUsers.toLocaleString()} usuarios
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Semana Actual
              </CardTitle>
              <Icon name="calendar" />
              {/* <Calendar className="h-4 w-4 text-blue-700" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                Semana {currentWeek}
              </div>
              <p className="text-xs text-gray-600">3 juegos pendientes</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ligas Activas
              </CardTitle>
              <Icon name="users" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <p className="text-xs text-gray-600">2 públicas, 1 privada</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Acciones Rápidas</CardTitle>
              <CardDescription>
                Gestiona tus quinielas de la semana
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/quiniela">
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
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Rendimiento Reciente
              </CardTitle>
              <CardDescription>Tus últimas predicciones</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Progreso de la Temporada
              </CardTitle>
              <CardDescription>Tu rendimiento general</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Próximos Juegos</CardTitle>
              <CardDescription>
                Semana {currentWeek} - Pendientes por predecir
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
