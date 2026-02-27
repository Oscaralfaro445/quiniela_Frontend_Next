import { useGetAccumulatedBag } from "@/hooks/accumulatedBag/queries/useGetAccumulatedBag";
import { Card } from "../shared/card/Card";

export const AccumulatedBagCard = () => {
  const { isPending, isError, data } = useGetAccumulatedBag();
  const bagInfo = data?.data?.[0];
  const totalQuiniela = bagInfo?.totalQuiniela || 0;
  const totalSurvivor = bagInfo?.totalSurvivor || 0;
  const totalPrize = bagInfo?.totalPremio || 0;
  const accumulatedBag = totalQuiniela + totalSurvivor - totalPrize;

  return (
    <Card>
      <div>
        <p className="text-lg text-blue-600 font-semibold">Bolsa acumulada</p>
        <p className=" text-sm text-neutral-600">
          Montos acumulados durante toda la temporada
        </p>
      </div>

      {isPending && <p>Cargando...</p>}

      {isError && <p>Error al cargar los datos...</p>}

      <div className="space-y-4">
        <Card>
          <div className="flex flex-col items-center justify-between text-center text-sm">
            <p className="text-neutral-600">Bolsa acumulada</p>
            <p className="text-lg font-semibold text-blue-600">
              {`$ ${accumulatedBag ?? "-"}`}
            </p>
            <p className="text-neutral-600">Recaudación total</p>
          </div>
        </Card>

        <div className="grid lg:flex w-full gap-4 lg:justify-between">
          <Card>
            <div className="flex flex-col justify-between text-sm">
              <p className="text-neutral-600">Total quiniela</p>
              <p className="text-lg font-semibold text-blue-600">
                {`$ ${totalQuiniela ?? "-"}`}
              </p>
              <p className="text-neutral-600">Recaudación quiniela</p>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col justify-between text-sm">
              <p className="text-neutral-600">Total survivor</p>
              <p className="text-lg font-semibold text-blue-600">
                {`$ ${totalSurvivor ?? "-"}`}
              </p>
              <p className="text-neutral-600">Recaudación survivor</p>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col justify-between text-sm">
              <p className="text-neutral-600">Premios Otorgados</p>
              <p className="text-lg font-semibold text-blue-600">
                {`$ ${totalPrize ?? "-"}`}
              </p>
              <p className="text-neutral-600">Premios entregados</p>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};
