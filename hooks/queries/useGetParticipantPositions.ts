import { axiosInstance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { ApiResponse } from "@/types/api/ApiResponse";

const fetchParticipantPositions = async (variables: {
  idQuiniela: number;
  idPeriodo: string;
}): Promise<ApiResponse<participantes>> => {
  const { idQuiniela, idPeriodo } = variables;
  const payload = {
    idProceso: 3,
    idQuery: 4,
    parmRemp: {
      $1: idQuiniela,
      $2: idPeriodo,
    },
  };
  const response = await axiosInstance.post<ApiResponse<participantes>>(
    "/Query/Consulta",
    payload,
  );

  return response.data;
};

export const useGetParticipantPositions = (periodOverride?: number) => {
  const { data } = useGetMe();
  const user = data?.data?.[0];
  const effectivePeriod =
    typeof periodOverride === "number" && periodOverride > 0
      ? String(periodOverride)
      : user?.idPeriodo;

  return useQuery({
    queryKey: [
      "participantPositions",
      user?.idQuiniela ?? "unknown",
      effectivePeriod ?? "unknown",
    ],
    queryFn: () =>
      fetchParticipantPositions({
        idQuiniela: user!.idQuiniela,
        idPeriodo: effectivePeriod!,
      }),
    enabled: !!user && !!effectivePeriod,
  });
};

export interface participante {
  Posicion: number;
  ID_QUINIELA: number;
  ID_PARTICIPANTE: number;
  periodo: string;
  Nombre: string;
  Puntos: number;
  B_GANADOR?: boolean;
  DIFERENCIAL?: number;
}

interface participantes {
  puntosPeriodo: participante[];
  puntosTotal: participante[];
}
