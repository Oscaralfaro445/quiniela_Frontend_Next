import Link from "next/link";
import { AccumulatedEarningsCard } from "@/components/dashboard/AccumulatedEarningsCard";
import { Button } from "@/components/shared/button/Button";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function EarningsPage() {
  return (
    <MainContainer>
      <div className="grid gap-4">
        <PageHeader
          title={`Consulta las ganancias de la temporada.`}
          text="Aquí tienes un resumen de las ganancias obtenidas por cada participante."
        />

        <AccumulatedEarningsCard />

        <div className="flex w-full gap-4 justify-center items-center">
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
