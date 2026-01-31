import Link from "next/link";
import { Button } from "@/components/shared/button/Button";
import { SurvivorReportCard } from "@/components/survivor/SurvivorReportCard";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function SurvivorPage() {
  return (
    <MainContainer>
      <div className="grid gap-4">
        <PageHeader
          title="Reporte de survivor"
          text="Consulta las selecciones de los participantes semana a semana."
        />

        <SurvivorReportCard />

        <div className="flex w-full gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al dashboard" theme="normal" />
          </Link>

          <Link href="/standings">
            <Button type="button" title="Ver clasificación" />
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
