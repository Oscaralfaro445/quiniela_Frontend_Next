"use client";

import Link from "next/link";
import { useAuth } from "@/context/authContext/AuthContext";
import usePostParticipantPositions from "@/hooks/participantPositions/queries/usePostParticipantPositions";
import { Card } from "@/components/shared/ui/card/Card";
import { CardHeader } from "@/components/shared/ui/cardHeader/CardHeader";
import { CardTitle } from "@/components/shared/ui/cardTitle/CardTitle";
import { Icon } from "@/components/shared/icon/Icon";
import { CardContent } from "@/components/shared/ui/cardContent/CardContent";
import { Button } from "@/components/shared/button/Button";

export default function Leaderboard() {
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

        {/* <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="weekly">Semana {currentWeek}</TabsTrigger>
            <TabsTrigger value="global">Global</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly"> */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Clasificación Semana {currentWeek}
            </CardTitle>
            <p className="text-sm text-gray-600">
              Basada en los aciertos de esta semana
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyLeaderboard?.map((player: any) => (
                <div
                  key={player.Secuencia}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-gray-50 ${
                    player.rank <= 3
                      ? "bg-blue-50 border-blue-200"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {getRankIcon(player.Secuencia)}
                    </div>
                    {/* <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar> */}
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
                      <div className="text-xs text-gray-500">Aciertos</div>
                    </div>

                    <div className="text-center">
                      {/* <Badge
                        variant="secondary"
                        className={`${getAccuracyColor(
                          player.accuracy
                        )} border-0`}
                      >
                        {player.accuracy}%
                      </Badge> */}
                    </div>

                    <div className="flex items-center space-x-1">
                      {getChangeIcon(player.change)}
                      {player.change !== "same" && (
                        <span className="text-xs text-gray-500">
                          {Math.abs(player.rank - player.previousRank)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* </TabsContent> */}

        {/*  <TabsContent value="global"> */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Clasificación Global
            </CardTitle>
            <p className="text-sm text-gray-600">
              Basada en el rendimiento de toda la temporada
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {globalLeaderboard?.map((player: any) => (
                <div
                  key={player.Secuencia}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-gray-50 ${
                    player.rank <= 3
                      ? "bg-blue-50 border-blue-200"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {getRankIcon(player.Secuencia)}
                    </div>
                    {/* <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar> */}
                    <div>
                      <div className="font-medium text-gray-900">
                        {player.Nombre}
                      </div>
                      {/* <div className="text-sm text-gray-500">
                        {player.username}
                      </div> */}
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
                      {/* <Badge
                        variant="secondary"
                        className={`${getAccuracyColor(
                          player.accuracy
                        )} border-0`}
                      >
                        {player.accuracy}%
                      </Badge> */}
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">
                        #{player.weeklyRank}
                      </div>
                      <div className="text-xs text-gray-500">Esta semana</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">
                        {player.streak > 0 ? `🔥 ${player.streak}` : "-"}
                      </div>
                      <div className="text-xs text-gray-500">Racha</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* </TabsContent>
        </Tabs> */}

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
