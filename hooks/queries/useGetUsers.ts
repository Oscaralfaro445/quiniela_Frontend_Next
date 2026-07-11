import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import { useGetMe } from "./user/useGetMe";

// Pasar a servicios
const fetchUsers = async (
  idQuiniela: number,
): Promise<ApiResponse<fetchUsersResponse>> => {
  const payload = {
    idProceso: 24,
    idQuery: 23,
    parmRemp: {
      $1: idQuiniela,
    },
  };
  const response = await axiosInstance.post<ApiResponse<fetchUsersResponse>>(
    "/Query/Consulta",
    payload,
  );

  return response.data;
};

export const useGetUsers = () => {
  const { data: user } = useGetMe();
  const userInfo = user?.data?.[0];

  return useQuery({
    queryKey: ["getUsers"],
    queryFn: () => fetchUsers(userInfo!.idQuiniela),
    enabled: !!userInfo?.idPeriodo,
  });
};

interface Participant {
  CVE_USUARIO: string;
  NOMBRE_COMPLETO: string;
  B_BLOQUEADO: boolean;
}

interface fetchUsersResponse {
  indicador: string;
  participantes: Participant[];
}
