import { useGetAccumulatedBag } from "@/hooks/accumulatedBag/queries/useGetAccumulatedBag";
import { Card } from "../shared/card/Card";

export const AccumulatedBagCard = () => {
  const { isPending, isError, isSuccess, data } = useGetAccumulatedBag();
  const totalQuiniela =
    data?.data[0].totalQuiniela +
    data?.data[0].totalSurvivor -
    data?.data[0].totalPremio;

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

      {isSuccess && (
        <div className="space-y-4">
          <Card>
            <div className="flex flex-col items-center justify-between text-center text-sm">
              <p className="text-neutral-600">Bolsa Acumulada</p>
              <p className="text-lg font-semibold text-blue-600">
                {`$ ${totalQuiniela}`}
              </p>
              <p className="text-neutral-600">Recaudación total</p>
            </div>
          </Card>

          <div className="grid lg:flex w-full gap-4 lg:justify-between">
            <Card>
              <div className="flex flex-col justify-between text-sm">
                <p className="text-neutral-600">Total quiniela</p>
                <p className="text-lg font-semibold text-blue-600">
                  {`$ ${data.data[0].totalQuiniela}`}
                </p>
                <p className="text-neutral-600">Recaudación quiniela</p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col justify-between text-sm">
                <p className="text-neutral-600">Total survivor</p>
                <p className="text-lg font-semibold text-blue-600">
                  {`$ ${data.data[0].totalSurvivor}`}
                </p>
                <p className="text-neutral-600">Recaudación survivor</p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col justify-between text-sm">
                <p className="text-neutral-600">Premios Otorgados</p>
                <p className="text-lg font-semibold text-blue-600">
                  {`$ ${data.data[0].totalPremio}`}
                </p>
                <p className="text-neutral-600">Premios entregados</p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </Card>
  );
};
