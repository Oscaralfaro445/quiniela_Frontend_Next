"use client";

import Link from "next/link";
import { useGetMarkers } from "@/hooks/markers/queries/useGetMarkers";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { Button } from "@/components/shared/button/Button";
import { StatisticsCard } from "@/components/scores/StatisticsCard";
import { ScoreBoard } from "@/components/scores/ScoreBoard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { DataUser } from "@/types/user/dataUser";

export default function ScoresPage() {
  const { isPending, isError, data } = useGetMarkers();
  const { data: user } = useGetMe();
  const dataUser: DataUser = user?.data?.[0];
  const week = dataUser?.idPeriodo;

  return (
    <div className="min-h-screen">
      <div className="pt-16">
        <PageHeader
          title={`Resultados Semana ${week}`}
          text="Marcadores de los juegos de la semana"
        />
      </div>

      {isPending && <p>Cargando...</p>}

      {isError && <p>Error al cargar los datos...</p>}

      {data?.data && data?.data.length > 0 ? (
        <>
          <StatisticsCard gameResults={data?.data} week={week} />
          <ScoreBoard gameResults={data?.data} />
        </>
      ) : (
        <div className="grid lg:flex max-w-[1280px] mx-auto px-10 py-8 gap-4">
          <p>No hay datos disponibles...</p>
        </div>
      )}

      <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
        <Link href="/dashboard">
          <Button type="button" title="Volver al Dashboard" theme="normal" />
        </Link>

        <Link href={"/quiniela"}>
          <Button type="submit" title="Ver Quiniela" />
        </Link>
      </div>
    </div>
  );
}
