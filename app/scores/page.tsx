"use client";

import Link from "next/link";
import { useGetMarkers } from "@/hooks/markers/queries/useGetMarkers";
import { MainContainer } from "@/components/ui/containers/MainContainer";
import { Button } from "@/components/shared/button/Button";
import { StatisticsCard } from "@/components/scores/StatisticsCard";
import { ScoreBoard } from "@/components/scores/ScoreBoard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { useGetMe } from "@/hooks/queries/user/useGetMe";

export default function ScoresPage() {
  const { isPending, isError, data } = useGetMarkers();
  const { data: userData } = useGetMe();
  const user = userData?.data?.[0];
  const week = user?.idPeriodo;

  return (
    <MainContainer>
      <div className="grid gap-4">
        <PageHeader
          title={`Resultados semana ${week}`}
          text="Marcadores de los juegos de la semana"
        />

        {isPending && <p>Cargando...</p>}

        {isError && <p>Error al cargar los datos...</p>}

        {data?.data && data?.data?.length > 0 ? (
          <>
            <StatisticsCard gameResults={data?.data} week={week} />
            <ScoreBoard gameResults={data?.data} />
          </>
        ) : (
          <div className="grid lg:flex gap-4">
            <p>No hay datos disponibles...</p>
          </div>
        )}

        <div className="flex w-full gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Link href={"/quiniela"}>
            <Button type="submit" title="Ver Quiniela" />
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
