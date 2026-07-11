import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useQuery } from "@tanstack/react-query";

const fetchResultsQuiniela = async (variables: {
  idQuiniela: number;
  idPeriodo: number;
  idParticipante: number;
}): Promise<ApiResponse<Game>> => {
  const { idQuiniela, idPeriodo, idParticipante } = variables;
  const payload = {
    idProceso: 23,
    idQuery: "21",
    parmRemp: {
      $1: idQuiniela,
      $2: idPeriodo,
      $3: idParticipante,
    },
  };
  const response = await axiosInstance.post<ApiResponse<Game>>(
    "/Query/Consulta",
    payload,
  );

  return response.data;
};

export const useGetResultsQuiniela = (participant: {
  idParticipante: number;
  idQuiniela: number;
  periodo: number;
}) => {
  return useQuery<ApiResponse<Game>, ApiError>({
    queryKey: [
      "resultsQuiniela",
      participant.periodo,
      participant.idParticipante,
    ],
    queryFn: () =>
      fetchResultsQuiniela({
        idQuiniela: participant.idQuiniela,
        idPeriodo: participant.periodo,
        idParticipante: participant.idParticipante,
      }),
  });
};

interface Game {
  equipo1: string;
  scoreEquipo1: number;
  equipo2: string;
  scoreEquipo2: number;
  cveGanador: string;
  puntos: number;
  totalGeneralPuntos: number;
}
