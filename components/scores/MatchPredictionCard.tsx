import { useGetMatchPrediction } from "@/hooks/matchPrediction/queries/useGetMatchPrediction";
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
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <table className="table-auto w-full">
              <thead className="bg-blue-600 text-white text-sm font-semibold sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4 border-b border-gray-200 text-left">
                    Nombre
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-left">
                    Equipo
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-left">
                    Estatus
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {data.data.map((prediction: MatchPrediction, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-2 px-4 border-b border-gray-200 font-medium">
                      {prediction.nomParticipante}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <TeamLogo
                        className="scale-75"
                        teamName={prediction.nomEquipoPronost}
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 font-bold text-blue-600">
                      {prediction.acerto === "si" ? (
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
        </div>
      )}
    </div>
  );
};
