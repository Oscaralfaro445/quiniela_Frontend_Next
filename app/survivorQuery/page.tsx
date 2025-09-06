"use client";

import Link from "next/link";
import { TextBody } from "@/components/shared/text/TextBody";
import { Title } from "@/components/shared/text/Title";
import { Button } from "@/components/shared/button/Button";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { SurvivorReportCard } from "@/components/survivorQuery/SurvivorReportCard";

export default function SurvivorPage() {
  return (
    <ProtectedRoute>
      <section className="pt-18">
        <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
          <div className="grid gap-2">
            <Title title="Reporte de Survivor" />
            <TextBody text="Vista general de las selecciones de los participantes por semana." />
          </div>

          <div className="flex h-fit justify-center items-center border-2 border-blue-600 rounded-2xl">
            <p className="px-2 py-1 text-sm font-semibold text-blue-700">
              NFL temporada 2025
            </p>
          </div>
        </div>
      </section>

      <SurvivorReportCard />

      <section>
        <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Link href="/positionQuery">
            <Button type="button" title="Ver Clasificación" />
          </Link>
        </div>
      </section>
    </ProtectedRoute>
  );
}
