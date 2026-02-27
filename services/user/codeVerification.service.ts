import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { CodeVerificationVariables } from "@/types/user/user.types";

export const codeVerification = async (
  variables: CodeVerificationVariables,
): Promise<ApiResponse<{ bExisteQuin: boolean; idQuiniela: number }>> => {
  const { code } = variables;
  const payload = {
    idProceso: 20,
    idQuery: "20",
    parmRemp: { $1: code },
  };

  const response = await axiosInstance.post<
    ApiResponse<{ bExisteQuin: boolean; idQuiniela: number }>
  >("/Query/Consulta", payload);

  return response.data;
};
