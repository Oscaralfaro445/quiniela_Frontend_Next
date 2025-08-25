import { useGetAccumulatedBag } from "@/hooks/accumulatedBag/queries/useGetAccumulatedBag";
import { Card } from "../shared/card/Card";

export const AccumulatedBagCard = () => {
  const { isPending, isError, isSuccess, data } = useGetAccumulatedBag();
  console.log("AccumulatedBagCard data:", data);

  return (
    <>
      <Card className="border-neutral-200">
        <div>
          <div className="text-gray-900">Bolsa Acumulada</div>
          <div>Montos acumulados durante toda la temporada</div>
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
          <div className="flex w-full gap-2 justify-between">
            <Card>
              <div className="flex flex-col">
                <div className="flex flex-col justify-between text-sm">
                  <span className="text-gray-600">Total Quiniela</span>
                  <span className="text-lg font-semibold text-gray-600">
                    {`$ ${data.data[0].totalQuiniela}`}
                  </span>
                  <span className="text-gray-600">Recaudación total</span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col">
                <div className="flex flex-col justify-between text-sm">
                  <span className="text-gray-600">Total Survivor</span>
                  <span className="text-lg font-semibold text-gray-600">
                    {`$ ${data.data[0].totalSurvivor}`}
                  </span>
                  <span className="text-gray-600">Recaudación survivor</span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col">
                <div className="flex flex-col justify-between text-sm">
                  <span className="text-gray-600">Total Premio</span>
                  <span className="text-lg font-semibold text-gray-600">
                    {`$ ${data.data[0].totalPremio}`}
                  </span>
                  <span className="text-gray-600">Premio acumulado</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </>
  );
};
