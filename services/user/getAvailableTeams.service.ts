import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { FavoriteTeamOption } from "@/types/user/user.types";

export const getAvailableTeams = async (): Promise<
  ApiResponse<FavoriteTeamOption>
> => {
  const payload = {
    idProceso: 25,
    idQuery: 25,
  };

  const response = await axiosInstance.post<ApiResponse<FavoriteTeamOption>>(
    "/Query/Consulta",
    payload,
  );

  return response.data;
};
