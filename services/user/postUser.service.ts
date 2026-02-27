import { ApiResponse } from "@/types/api/ApiResponse";
import { PostUserVariables, UserCreateResponse } from "@/types/user/user.types";
import { axiosInstance } from "@/api/axiosInstance";

export const postUser = async (
  variables: PostUserVariables,
): Promise<ApiResponse<UserCreateResponse>> => {
  const { registerData, identificador } = variables;

  const payload = {
    idProceso: 9999,
    model: "FC_SEG_USUARIO",
    data: {
      CVE_USUARIO: registerData.cveUsuario,
      APELLIDO_PATERNO: registerData.apellidoPaterno,
      APELLIDO_MATERNO: registerData.apellidoMaterno,
      NOMBRE: registerData.nombre,
      PASSWORD: registerData.password,
      B_BLOQUEADO: 1,
      SIT_USUARIO: "I",
      CVE_IDIOMA: "ES",
      CVE_PERFIL: "PARTICIPANTE",
      IDENTIFICADOR: identificador,
    },
  };

  const response = await axiosInstance.post<ApiResponse<UserCreateResponse>>(
    "/Crud/Crea",
    payload,
  );

  return response.data;
};
