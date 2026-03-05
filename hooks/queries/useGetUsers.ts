import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const payload = {
    idProceso: 24,
    idQuery: 23,
    parmRemp: {
      $1: 1,
    },
  };
  const response = await axiosInstance.post<
    ApiResponse<{ indicador: string; participantes: User[] }>
  >("/Query/Consulta", payload);

  return response.data;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: fetchUsers,
  });
};

interface User {
  CVE_USUARIO: string;
  NOMBRE_COMPLETO: string;
  B_BLOQUEADO: boolean;
}
