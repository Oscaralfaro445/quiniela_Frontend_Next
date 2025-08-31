import { useGetAccumulatedBag } from "@/hooks/accumulatedBag/queries/useGetAccumulatedBag";
import { Card } from "../shared/card/Card";

export const AccumulatedBagCard = () => {
  const { isPending, isError, isSuccess, data } = useGetAccumulatedBag();
  const totalQuiniela =
    data?.data[0].totalQuiniela +
    data?.data[0].totalSurvivor -
    data?.data[0].totalPremio;

  return (
    <>
      <Card>
        <div className="flex flex-col">
          <span className="text-lg text-blue-700 font-semibold">
            Bolsa Acumulada
          </span>
          <span className=" text-sm text-gray-600">
            Montos acumulados durante toda la temporada
          </span>
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
          <>
            <Card>
              <div className="flex flex-col items-center justify-between text-center text-sm">
                <span className="text-gray-600">Bolsa Acumulada</span>
                <span className="text-lg font-semibold text-gray-600">
                  {`$ ${totalQuiniela}`}
                </span>
                <span className="text-gray-600">Recaudación total</span>
              </div>
            </Card>

            <div className="grid lg:flex w-full gap-4 lg:justify-between">
              <Card>
                <div className="flex flex-col justify-between text-sm">
                  <span className="text-gray-600">Total Quiniela</span>
                  <span className="text-lg font-semibold text-gray-600">
                    {`$ ${data.data[0].totalQuiniela}`}
                  </span>
                  <span className="text-gray-600">Recaudación quiniela</span>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col justify-between text-sm">
                  <span className="text-gray-600">Total Survivor</span>
                  <span className="text-lg font-semibold text-gray-600">
                    {`$ ${data.data[0].totalSurvivor}`}
                  </span>
                  <span className="text-gray-600">Recaudación survivor</span>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col justify-between text-sm">
                  <span className="text-gray-600">Premios Otorgados</span>
                  <span className="text-lg font-semibold text-gray-600">
                    {`$ ${data.data[0].totalPremio}`}
                  </span>
                  <span className="text-gray-600">Premios entregados</span>
                </div>
              </Card>
            </div>
          </>
        )}
      </Card>
    </>
  );
};
