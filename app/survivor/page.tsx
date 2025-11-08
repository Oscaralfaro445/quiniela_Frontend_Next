"use client";

import Link from "next/link";
import { Button } from "@/components/shared/button/Button";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { SurvivorReportCard } from "@/components/survivor/SurvivorReportCard";
import { HeaderPage } from "@/components/ui/headerPage/HeaderPage";

export default function SurvivorPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-18">
        <HeaderPage
          title="Reporte de Survivor"
          text="Consulta las selecciones de los participantes semana a semana."
        />

        <SurvivorReportCard />

        <section>
          <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                type="button"
                title="Volver al Dashboard"
                theme="normal"
              />
            </Link>

            <Link href="/standings">
              <Button type="button" title="Ver Clasificación" />
            </Link>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
