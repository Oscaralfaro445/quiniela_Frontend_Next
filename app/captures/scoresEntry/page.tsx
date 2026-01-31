"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetMarkers } from "@/hooks/markers/queries/useGetMarkers";
import { usePostMarkers } from "@/hooks/markers/mutations/usePostMarkers";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { GameResult } from "@/types/gameResult/gameResult";
import { Button } from "@/components/shared/button/Button";
import { StatisticsCard } from "@/components/scores/StatisticsCard";
import { ScoreBoard } from "@/components/captures/scoresEntry/ScoreBoard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { DataUser } from "@/types/user/dataUser";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function ScoresEntryPage() {
  const { isPending, isError, isSuccess, data } = useGetMarkers();
  const markersUpdate = usePostMarkers();
  const { data: user } = useGetMe();
  const dataUser: DataUser = user?.data?.[0];
  const week = dataUser?.idPeriodo;

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
    value: string,
  ) => {
    const numValue = Number.parseInt(value) || 0;

    setGameResults((prevScores) =>
      prevScores.map((game) =>
        game.partido === partido
          ? {
              ...game,
              [team === "away" ? "marcVisita" : "marLocal"]: numValue,
            }
          : game,
      ),
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
    <MainContainer>
      <div className="grid gap-4">
        <PageHeader
          title={`Marcadores Semana ${week}`}
          text="Edita los marcadores de los partidos de la semana"
        />

        {isPending && <p>Cargando...</p>}

        {isError && <p>Error al cargar los datos...</p>}

        {isSuccess && (
          <>
            <StatisticsCard gameResults={data.data} week={week} />
            <ScoreBoard
              gameResults={gameResults}
              handleScoreChange={handleScoreChange}
            />
          </>
        )}

        <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button
            type="submit"
            title="Actualizar Marcadores"
            onClick={handleSubmitScores}
          />
        </div>
      </div>
    </MainContainer>
  );
}
