import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { TokenVerificationVariables } from "@/types/changePassword/changePassword";

export const tokenVerification = async (
  variables: TokenVerificationVariables,
): Promise<ApiResponse<null>> => {
  const { token } = variables;
  const payload = {
    idProceso: 21,
    idProcedure: 9,
    parmRemp: {
      $1: token,
    },
  };
  const response = await axiosInstance.post<ApiResponse<null>>(
    "/Query/Consulta",
    payload,
  );

  return response.data;
};
