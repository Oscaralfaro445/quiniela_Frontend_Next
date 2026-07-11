import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { ProfileEditUpdateVariables } from "@/types/user/user.types";

export const updateUserProfileEdit = async (
  variables: ProfileEditUpdateVariables,
): Promise<ApiResponse<null>> => {
  const {
    idQuiniela,
    cveUsuario,
    apellidoPaterno,
    apellidoMaterno,
    nombre,
    idEquipoFav,
  } = variables;

  const payload = {
    idProceso: 25,
    idProcedure: 10,
    parmRemp: {
      $1: JSON.stringify({
        idQuiniela,
        cveUsuario,
        apellidoPaterno,
        apellidoMaterno,
        nombre,
        idEquipoFav,
      }),
    },
  };

  const response = await axiosInstance.post<ApiResponse<null>>(
    "/Query/Procedure",
    payload,
  );

  return response.data;
};
