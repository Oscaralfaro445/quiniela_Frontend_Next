import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import { useGetMe } from "../user/useGetMe";

const getFavoriteTeam = async (idEquipoVa: number, idPeriodo: string) => {
  const payload = {
    idProceso: 32,
    idQuery: 27,
    parmRemp: {
      $1: idEquipoVa, // Equipo favorito
      $2: idPeriodo, // Periodo actual
    },
  };
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetFavoriteTeam = () => {
  const { data: user } = useGetMe();
  const userInfo = user?.data?.[0];

  return useQuery<ApiResponse<any>>({
    queryKey: ["favoriteTeam"],
    queryFn: () => getFavoriteTeam(userInfo!.idEquipoVa, userInfo!.idPeriodo),
  });
};
