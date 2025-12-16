"use client";

import Link from "next/link";
import { useGetMarkers } from "@/hooks/markers/queries/useGetMarkers";
import { useAuth } from "@/context/authContext/AuthContext";
import { Button } from "@/components/shared/button/Button";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { StatisticsCard } from "@/components/scores/StatisticsCard";
import { ScoreBoard } from "@/components/scores/ScoreBoard";
import { PageHeader } from "@/components/ui/pageHeader/PageHeader";

export default function ScoresPage() {
  const { dataUser } = useAuth();
  const week = dataUser?.idPeriodo;
  const { isPending, isError, isSuccess, data } = useGetMarkers();

  return (
    <ProtectedRoute>
      <div className="pt-16">
        <PageHeader
          title={`Resultados Semana ${week}`}
          text="Marcadores de los juegos de la semana"
        />
      </div>

      {isPending && <p>Cargando...</p>}

      {isError && <p>Error al cargar los datos...</p>}

      {isSuccess && data.data && (
        <>
          <StatisticsCard gameResults={data.data} week={week} />
          <ScoreBoard gameResults={data.data} />
        </>
      )}

      <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
        <Link href="/dashboard">
          <Button type="button" title="Volver al Dashboard" theme="normal" />
        </Link>

        <Link href={"/quiniela"}>
          <Button type="submit" title="Ver Quiniela" />
        </Link>
      </div>
    </ProtectedRoute>
  );
}
