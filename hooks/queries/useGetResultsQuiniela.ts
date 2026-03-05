import { axiosInstance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchResultsQuiniela = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: number;
    $2: number;
    $3: number;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetResultsQuiniela = (participant: {
  idParticipante: number;
  idQuiniela: number;
  periodo: number;
}) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [
      "resultsQuiniela",
      participant.periodo,
      participant.idParticipante,
    ],
    queryFn: () =>
      fetchResultsQuiniela({
        idProceso: 23,
        idQuery: "21",
        parmRemp: {
          $1: participant.idQuiniela,
          $2: participant.periodo,
          $3: participant.idParticipante,
        },
      }),
  });
  return { isPending, isError, data, error };
};
