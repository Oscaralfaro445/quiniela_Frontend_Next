import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { UserProfileEditResponse } from "@/types/user/user.types";

export const getUserProfileEdit = async (
  cveUsuario: string,
): Promise<ApiResponse<UserProfileEditResponse>> => {
  const payload = {
    idProceso: 25,
    idQuery: 24,
    parmRemp: {
      $1: cveUsuario,
    },
  };

  const response = await axiosInstance.post<ApiResponse<UserProfileEditResponse>>(
    "/Query/Consulta",
    payload,
  );

  return response.data;
};