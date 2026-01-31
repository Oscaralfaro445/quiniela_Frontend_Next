import { useGetGainsPayments } from "@/hooks/gainsPayments/queries/useGetGainsPayments";
import { Card } from "../shared/card/Card";

interface Participant {
  nomParticipante: string;
  ingresos: string;
  survivors: string;
  ganancia: string;
}

export const AccumulatedGainsCard = () => {
  const { isPending, isError, isSuccess, data } = useGetGainsPayments();
  const gainsPayments = data?.data;

  return (
    <Card>
      <div className="flex flex-col">
        <p className="text-lg text-blue-700 font-semibold">Ganancias</p>
        <p className=" text-sm text-neutral-600">
          Ganancias por participante en la temporada actual
        </p>
      </div>

      {isPending && <span>Cargando...</span>}

      {isError && <span>Error al cargar los datos...</span>}

      {isSuccess && gainsPayments ? (
        <table className="table-auto">
          <thead className="">
            <tr className="border bg-blue-600 text-white shadow rounded-lg">
              <th className="text-left text-sm p-2">Participante</th>
              <th className="text-left text-sm  p-2">Ingresos</th>
              <th className="text-left text-sm  p-2">Survivors</th>
              <th className="text-left text-sm  p-2">Ganancia</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-300">
            {gainsPayments.map((participant: Participant, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="text-left text-sm text-gray-600 p-2">
                  {participant.nomParticipante}
                </td>
                <td className="text-left text-sm text-gray-600 p-2">
                  {`$ ${participant.ingresos}`}
                </td>
                <td className="text-left text-sm text-gray-600 p-2">
                  {`$ ${participant.survivors}`}
                </td>
                <td className="text-left text-sm text-gray-600 p-2">
                  {`$ ${participant.ganancia}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-neutral-600">No hay informacion que mostrar...</p>
      )}
    </Card>
  );
};
