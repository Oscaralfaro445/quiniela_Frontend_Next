import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { TokenVerificationVariables } from "@/types/changePassword/changePassword";

export const tokenVerification = async (
  variables: TokenVerificationVariables,
): Promise<ApiResponse<{ usuario: string }>> => {
  const { token } = variables;
  const payload = {
    idProceso: 21,
    idProcedure: 9,
    parmRemp: {
      $1: token,
    },
  };

  const response = await axiosInstance.post<ApiResponse<{ usuario: string }>>(
    "/Query/Procedure",
    payload,
  );

  return response.data;
};
