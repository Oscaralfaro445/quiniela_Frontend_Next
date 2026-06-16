import { useGetMatchPrediction } from "@/hooks/queries/useGetMatchPrediction";
import { TeamLogo } from "../shared/teamLogo/TeamLogo";
import { Icon } from "../shared/icon/Icon";

interface MatchPredictionCardProps {
  gameId: number;
}

interface MatchPrediction {
  idParticipante: number;
  nomParticipante: string;
  pronostico: string;
  idEquipoPronost: number;
  nomEquipoPronost: string;
  acerto: string;
}

export const MatchPredictionCard = ({ gameId }: MatchPredictionCardProps) => {
  const { isPending, isError, data } = useGetMatchPrediction(gameId);

  if (isPending) {
    return <p>Cargando...</p>;
  }

  if (isError) {
    return <p>Error al cargar los datos...</p>;
  }

  return (
    <div className="grid gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Pronóstico de partido
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
      </div>

      {data?.data ? (
        <div className="w-full max-h-[70vh] overflow-auto rounded-lg">
          <table className="w-full">
            <thead className="bg-blue-600 text-white text-sm font-semibold sticky top-0 z-10">
              <tr>
                <th className="p-2 border-b border-gray-200 text-left">
                  Nombre
                </th>
                <th className="p-2 border-b border-gray-200 text-left">
                  Equipo
                </th>
                <th className="p-2 border-b border-gray-200 text-left">
                  Estatus
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm">
              {data?.data?.map((prediction: MatchPrediction, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 border-b border-gray-200 font-medium">
                    {prediction?.nomParticipante}
                  </td>
                  <td className="p-2 border-b border-gray-200">
                    {prediction?.pronostico !== " " && (
                      <TeamLogo teamName={prediction?.nomEquipoPronost} />
                    )}
                  </td>
                  <td className="p-2 border-b border-gray-200 font-bold text-blue-600">
                    {prediction?.acerto === "Pendiente" ? (
                      <Icon name="calendar-clock" />
                    ) : prediction?.acerto === "si" ? (
                      <Icon name="check" color="green" />
                    ) : (
                      <Icon name="x" color="red" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
};
