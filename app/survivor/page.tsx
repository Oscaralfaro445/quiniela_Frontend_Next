import Link from "next/link";
import { Button } from "@/components/shared/button/Button";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { SurvivorReportCard } from "@/components/survivor/SurvivorReportCard";
import { PageHeader } from "@/components/ui/pageHeader/PageHeader";

export default function SurvivorPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-16">
        <PageHeader
          title="Reporte de survivor"
          text="Consulta las selecciones de los participantes semana a semana."
        />

        <SurvivorReportCard />

        <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al dashboard" theme="normal" />
          </Link>

          <Link href="/standings">
            <Button type="button" title="Ver clasificación" />
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
