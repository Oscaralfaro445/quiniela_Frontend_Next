"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import usePostSurvivorTeams from "@/hooks/survivor/queries/usePostSurvivorTeams";
import usePostMatches from "@/hooks/matches/queries/usePostMatches";
import usePostScores from "@/hooks/scores/mutations/usePostScores";
import usePostSurvivorTeam from "@/hooks/survivor/mutations/usePostSurvivorTeam";
import { useAuth } from "@/context/authContext/AuthContext";
import { Icon } from "@/components/shared/icon/Icon";
import { Card } from "@/components/shared/ui/card/Card";
import { CardContent } from "@/components/shared/ui/cardContent/CardContent";
import { CardHeader } from "@/components/shared/ui/cardHeader/CardHeader";
import { Button } from "@/components/shared/button/Button";
import { InputCombo } from "@/components/shared/input/inputs/InputCombo";

export default function QuinielaPage() {
  const { dataUser } = useAuth();
  const scores = usePostScores();
  const matches = usePostMatches();
  const survivor = usePostSurvivorTeams();
  const survivorTeam = usePostSurvivorTeam();
  const week = dataUser?.idPeriodo;
  const survivorTeams = survivor?.data?.data;
  console.log("Survivor Teams:", survivorTeams);

  const [quinielaData, setQuinielaData] = useState({
    equipo: 0,
  });
  const [games, setGames] = useState<any[]>([]);

  console.log("games", games);

  useEffect(() => {
    const games = matches?.data?.data[0].quiniela;
    setGames(games);
  }, [matches.isSuccess]);

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setQuinielaData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnClick = () => {
    scores.mutate({ idEquipo: 1 });
    survivorTeam.mutate({
      id_Equipo_Suv: quinielaData.equipo,
    });
  };

  // Estado para las predicciones
  const [picks, setPicks] = useState<Record<string, string>>({});
  // const [saved, setSaved] = useState(false);

  const handlePickChange = (gameId: string, team: string) => {
    setPicks((prev) => ({
      ...prev,
      [gameId]: team,
    }));
  };

  /* const handleSave = () => {
    // Aquí iría la lógica para guardar las predicciones
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }; */

  const completedPicks = Object.keys(picks).length;
  const totalGames = games?.length;
  const progress = (completedPicks / totalGames) * 100;

  return (
    <div className="">
      <div className="">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Semana {week} - Quiniela
              </h2>
              <p className="text-gray-600">
                Selecciona el ganador de cada juego
              </p>
            </div>
            {/* <Badge variant="outline" className="text-blue-700 border-blue-700">
              NFL Temporada 2024
            </Badge> */}
          </div>

          <Card className="border-gray-200">
            <CardContent className="">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progreso
                </span>
                <span className="text-sm text-gray-600">
                  {completedPicks}/{totalGames} juegos
                </span>
              </div>
              {/*               <Progress value={progress} className="h-2" />
               */}{" "}
            </CardContent>

            <div className="flex w-full justify-center">
              <div className="w-1/3">
                <InputCombo
                  name="equipo"
                  data={survivorTeams}
                  value={quinielaData.equipo}
                  onChange={handleChange}
                  optionValueKey="llave"
                  optionLabelKey="valor"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid">
          {games?.map((game) => (
            <Card
              key={game.idPartido}
              className="border-gray-200 hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Icon name="clock" />
                    <span className="text-sm font-medium text-gray-700">
                      {game.F_PARTIDO}
                    </span>

                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Icon name="map-pin" />
                      <span>{game.ESTADIO}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    id={`game-${game.idEquipo1}`}
                    name={`game-${game.idPartido}`}
                    value={game.idEquipo1}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs font-bold text-gray-700">
                        {game?.equipo1}
                      </span>
                      {picks[game.id] === game.awayTeam && (
                        <Icon name="check" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    id={`game-${game.idEquipo2}`}
                    name={`game-${game.idPartido}`}
                    value={game.idEquipo2}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs font-bold text-gray-700">
                        {game?.equipo2}
                      </span>
                      {picks[game.id] === game.awayTeam && (
                        <Icon name="check" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>
          <Button
            type="submit"
            title="Enviar Quiniela"
            onClick={handleOnClick}
          />
        </div>
      </div>
    </div>
  );
}
