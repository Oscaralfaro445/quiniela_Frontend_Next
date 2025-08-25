import { useGetSurvivor } from "@/hooks/dashboard/queries/useGetSurvivor";
import { Card } from "../shared/card/Card";

export const SurvivorCard = () => {
  const { isPending, isError, isSuccess, data } = useGetSurvivor();
  console.log("SurvivorCard data:", data);

  return (
    <>
      <Card className="border-neutral-200">
        <div>
          <div className="text-gray-900">Survivor</div>
          <div>Tu rendimiento general</div>
        </div>

        {isPending && <span>Cargando...</span>}

        {isError && <span>Error al cargar los datos...</span>}

        {isSuccess && (
          <div className="">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Precisión General</span>
                <span className="font-medium text-gray-900">{64}%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Juegos Completados</span>
                <span className="font-medium text-gray-900">{100}/112</span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </>
  );
};
