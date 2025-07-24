"use client";

import { useEffect } from "react";
import useParticipantPositions from "@/hooks/participantPositions/mutations/useParticipantPositions";
import { useAuth } from "@/context/AuthContext";

export default function ParticipantsPage() {
  const { token, dataUser, isLoading } = useAuth();
  const participantPositionsMutation = useParticipantPositions();

  useEffect(() => {
    if (isLoading) return;

    if (token) {
      participantPositionsMutation.mutate({ token, dataUser });
    }
  }, [token, dataUser, isLoading]);

  /* const columnHeaders = (object: any) => {
    const data = object ?? [];
    return Object.keys(data[0]);
  };

  console.log(participantPositionsMutation.data?.data[0].puntosPeriodo);
  const table = {
    columns: columnHeaders(
      participantPositionsMutation.data?.data[0].puntosPeriodo
    ),
    rows: [],
  }; */

  return (
    <div className="p-4 align-middle inline-block min-w-full">
      <div className="overflow-x-auto sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {table.columns?.map((column) => (
                <th
                  scope="col"
                  key={`col-${column}`}
                  className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {table.rows?.map((row, index) => (
              <tr
                key={index}
                /* className={`cursor-pointer ${
                  selectedRow === index ? "bg-indigo-50 text-white" : ""
                } `}
                onClick={() => {
                  handleSelectedRow(index, row);
                }} */
              >
                {Object.values(row).map((value, i) => (
                  <td key={i} className="px-6 py-3 text-center">
                    <div className="text-xs text-gray-500">{String(value)}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

{
  /* <>
      {participantPositionsMutation.isSuccess && (
        <>{participantPositionsMutation.data[0]?.puntosPeriodo}</>
      )}

      <div className="flex">
        <h1>Posiciones de la semana</h1>
        {participantPositionsMutation.isSuccess &&
          participantPositionsMutation.data && (
            <ul>
              {participantPositionsMutation.data.data?.[0]?.puntosPeriodo.map(
                (participante: any, index: number) => (
                  <li key={index}>
                    {index + 1}. {participante.Nombre} - {participante.Puntos}{" "}
                    pts
                  </li>
                )
              )}
            </ul>
          )}

        <h1>Posiciones globales</h1>
        {participantPositionsMutation.isSuccess &&
          participantPositionsMutation.data && (
            <ul>
              {participantPositionsMutation.data.data?.[0]?.puntosTotal.map(
                (participante: any, index: number) => (
                  <li key={index}>
                    {index + 1}. {participante.Nombre} - {participante.Puntos}{" "}
                    pts
                  </li>
                )
              )}
            </ul>
          )}
      </div>
    </> */
}
