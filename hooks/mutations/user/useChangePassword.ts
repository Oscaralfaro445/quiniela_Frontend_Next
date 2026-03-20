import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

const changePassword = async (variables: {
  user: string;
  newPassword: string;
}): Promise<ApiResponse<{ contador: number }>> => {
  const { user, newPassword } = variables;

  const payload = {
    idProceso: 9999,
    model: "FC_SEG_USUARIO",
    data: {
      CVE_USUARIO: user,
      PASSWORD: newPassword,
    },
  };
  const response = await axiosInstance.post("/Crud/Modifica", payload);

  return response.data;
};

export const useChangePassword = () => {
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation<
    ApiResponse<{ contador: number }>,
    ApiError,
    { user: string; newPassword: string }
  >({
    mutationKey: ["changePassword"],
    mutationFn: changePassword,
    onSettled: (data, error) => {
      const requestData = data || error?.response?.data;
      handleRequestStatus({
        estatus: requestData?.estatus,
        errorUs: requestData?.errorUs ?? "",
        errorNeg: requestData?.errorNeg ?? [],
        error: error?.message ?? "",
        mensajeExito: "Contraseña actualizada correctamente",
      });
    },
  });
};
