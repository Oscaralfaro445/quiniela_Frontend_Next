import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useQuery } from "@tanstack/react-query";

const getFavoriteTeam = async () => {
  const payload = {
    idProceso: 32,
    idQuery: 27,
    parmRemp: {
      $1: 1, // Equipo favorito
      $2: 5, // Periodo actual
    },
  };
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetFavoriteTeam = () => {
  return useQuery<ApiResponse<any>>({
    queryKey: ["favoriteTeam"],
    queryFn: getFavoriteTeam,
  });
};
