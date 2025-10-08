import { useGetMatchPrediction } from "@/hooks/matchPrediction/queries/useGetMatchPrediction";

interface MatchPredictionCardProps {
  gameId: number;
}

interface MatchPrediction {
  idParticipante: number;
  nomParticipante: string;
  pronostico: string;
  idEquipoPronost: number;
  acerto: boolean;
}

export const MatchPredictionCard = ({ gameId }: MatchPredictionCardProps) => {
  const { isPending, isError, isSuccess, error, data } =
    useGetMatchPrediction(gameId);

  return (
    <div className="grid gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Pronostico de partido
        </h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      {isPending && <div>Cargando...</div>}

      {isError && <div>Error: {error?.message}</div>}

      {isSuccess && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max bg-white shadow-sm rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-blue-600 text-white text-center text-sm font-semibold">
                <th className="py-3 px-4 border-b border-gray-200">Nombre</th>
                <th className="py-3 px-4 border-b border-gray-200">Equipo</th>
                <th className="py-3 px-4 border-b border-gray-200">Estatus</th>
              </tr>
            </thead>

            <tbody className="text-center text-gray-700 text-sm">
              {data.data.map((prediction: MatchPrediction, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 border-b border-gray-200 font-medium">
                    {prediction.nomParticipante}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 font-bold text-blue-600">
                    {prediction.pronostico}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 font-bold text-blue-600">
                    {prediction.acerto}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
