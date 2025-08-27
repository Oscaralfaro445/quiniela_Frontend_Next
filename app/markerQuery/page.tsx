"use client";

import Link from "next/link";
import useGetMarkers from "@/hooks/markers/queries/useGetMarkers";
import { useAuth } from "@/context/authContext/AuthContext";
import { Button } from "@/components/shared/button/Button";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { StatisticsCard } from "@/components/markerQuery/StatisticsCard";
import { ScoreBoard } from "@/components/markerQuery/ScoreBoard";

export default function MarkerQueryPage() {
  const { dataUser } = useAuth();
  const week = dataUser?.idPeriodo;
  const { isPending, isError, isSuccess, data } = useGetMarkers();

  return (
    <ProtectedRoute>
      <section className="pt-18">
        <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
          <div className="grid gap-2">
            <Title title={`Resultados Semana ${week}`} />
            <TextBody text="Marcadores finales de todos los juegos" />
          </div>

          <div className="flex h-fit justify-center items-center border-2 border-blue-600 rounded-2xl">
            <p className="px-2 py-1 text-sm font-semibold text-blue-700">
              NFL temporada 2025
            </p>
          </div>
        </div>
      </section>

      {isPending && <span>Cargando...</span>}

      {isError && <span>Error al cargar los datos...</span>}

      {isSuccess && (
        <>
          <StatisticsCard gameResults={data.data} week={week} />{" "}
          <ScoreBoard gameResults={data.data} />
        </>
      )}

      <section>
        <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Button type="submit" title="Enviar Quiniela" onClick={() => {}} />
        </div>
      </section>
    </ProtectedRoute>
  );
}
