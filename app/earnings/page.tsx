import Link from "next/link";
import { AccumulatedEarningsCard } from "@/components/dashboard/AccumulatedEarningsCard";
import { Button } from "@/components/shared/button/Button";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";

export default function EarningsPage() {
  return (
    <div className="grid pt-18">
      <PageHeader
        title={`Consulta las ganancias de la temporada.`}
        text="Aquí tienes un resumen de las ganancias obtenidas por cada participante."
      />

      <div className="grid w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 ">
        <AccumulatedEarningsCard />
      </div>

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
