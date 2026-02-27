import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { LoginVariables } from "@/types/user/user.types";

export const login = async (
  variables: LoginVariables,
): Promise<ApiResponse<null>> => {
  const { cveUsuario, password } = variables;
  const payload = {
    idProceso: 1,
    cveAplicacion: "NFL",
    cveUsuario,
    password,
  };

  const response = await axiosInstance.post("/Login/Autentica", payload);

  return response.data;
};
