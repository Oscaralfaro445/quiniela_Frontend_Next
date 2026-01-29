"use client";

import Link from "next/link";
import { useGetMarkers } from "@/hooks/markers/queries/useGetMarkers";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { MainContainer } from "@/components/ui/containers/MainContainer";
import { Button } from "@/components/shared/button/Button";
import { StatisticsCard } from "@/components/scores/StatisticsCard";
import { ScoreBoard } from "@/components/scores/ScoreBoard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";

export default function ScoresPage() {
  const { isPending, isError, data } = useGetMarkers();
  const { data: user } = useGetMe();
  const dataUser: DataUser = user?.data?.[0];
  const week = dataUser?.idPeriodo;

  return (
    <MainContainer>
      <PageHeader
        title={`Resultados semana ${week}`}
        text="Marcadores de los juegos de la semana"
      />

      {isPending && <p>Cargando...</p>}

      {isError && <p>Error al cargar los datos...</p>}

      {data?.data && data?.data.length > 0 ? (
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
    </MainContainer>
  );
}
