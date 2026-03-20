import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api/ApiResponse";
import { ApiError } from "@/types/api/ApiError";
import { CodeVerificationVariables } from "@/types/user/user.types";
import { codeVerification } from "@/services/user/codeVerification.service";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

export const useCodeVerification = () => {
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation<
    ApiResponse<{ idQuiniela: number }>,
    ApiError,
    CodeVerificationVariables
  >({
    mutationKey: ["codeVerification"],
    mutationFn: codeVerification,
    onSettled: (data, error) => {
      const requestData = data || error?.response?.data;
      handleRequestStatus({
        estatus: requestData?.estatus,
        errorUs: requestData?.errorUs ?? "",
        errorNeg: requestData?.errorNeg ?? [],
        error: error?.message ?? "",
        mensajeExito:
          "La clave ha sido validada correctamente. Puedes continuar con el registro.",
      });
    },
  });
};
