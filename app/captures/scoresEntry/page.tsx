"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetMarkers } from "@/hooks/markers/queries/useGetMarkers";
import { usePostMarkers } from "@/hooks/markers/mutations/usePostMarkers";
import { useAuth } from "@/context/authContext/AuthContext";
import { GameResult } from "@/types/gameResult/gameResult";
import { Button } from "@/components/shared/button/Button";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { StatisticsCard } from "@/components/scores/StatisticsCard";
import { ScoreBoard } from "@/components/captures/scoresEntry/ScoreBoard";
import { HeaderPage } from "@/components/ui/headerPage/HeaderPage";

export default function ScoresEntryPage() {
  const { dataUser } = useAuth();
  const week = dataUser?.idPeriodo;
  const { isPending, isError, isSuccess, data } = useGetMarkers();
  const markersUpdate = usePostMarkers();

  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const gameResults = data.data;
      setGameResults(gameResults);
    }
  }, [isSuccess, data, dataUser]);

  const handleScoreChange = (
    partido: number,
    team: "away" | "home",
    value: string
  ) => {
    const numValue = Number.parseInt(value) || 0;

    setGameResults((prevScores) =>
      prevScores.map((game) =>
        game.partido === partido
          ? {
              ...game,
              [team === "away" ? "marcVisita" : "marLocal"]: numValue,
            }
          : game
      )
    );
  };

  const handleSubmitScores = () => {
    const gameResultsUpdated = gameResults.map((game: GameResult) => ({
      ID_PERIODO: dataUser!.idPeriodo,
      ID_PARTIDO: game.partido,
      ID_SCORE_E1: game.marcVisita,
      ID_SCORE_E2: game.marLocal,
    }));

    markersUpdate.mutate(gameResultsUpdated);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-18">
        <HeaderPage
          title={`Marcadores Semana ${week}`}
          text="Edita los marcadores de los partidos de la semana"
        />

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && <StatisticsCard gameResults={data.data} week={week} />}

        {isSuccess && (
          <ScoreBoard
            gameResults={gameResults}
            handleScoreChange={handleScoreChange}
          />
        )}

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
              type="submit"
              title="Actualizar Marcadores"
              onClick={handleSubmitScores}
            />
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
