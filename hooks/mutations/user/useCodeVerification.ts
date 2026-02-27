// import { useAlert } from "@/context/alert/AlertContext";
import { codeVerification } from "@/services/user/codeVerification.service";
import { ApiResponse } from "@/types/api/ApiResponse";
import { CodeVerificationVariables } from "@/types/user/user.types";
// import { AlertState } from "@/types/alert/alert";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";

export const useCodeVerification = () => {
  // const { showAlert } = useAlert();

  return useMutation<
    ApiResponse<{ bExisteQuin: boolean; idQuiniela: number }>,
    ApiError,
    CodeVerificationVariables
  >({
    mutationKey: ["codeVerification"],
    mutationFn: codeVerification,
  });
};

/* export const useKeyValdiation = () => {
  const { showAlert } = useAlert();

  return useMutation({
    mutationKey: ["keyValidation"],
    mutationFn: (code: string) =>
      validateKey({ idProceso: 20, idQuery: "20", parmRemp: { $1: code } }),
    onError: (error) => {
      showAlert(
        AlertState.ERROR,
        "Error en la Validación",
        "Tuvimos un problema al validar tu clave, " + error.message,
      );
    },
    onSuccess: (data) => {
      if (data.data[0].bExisteQuin) {
        showAlert(
          AlertState.SUCCESS,
          "Clave Válida",
          "La clave ha sido validada correctamente. Puedes continuar con el registro.",
        );
      } else if (!data.data[0].bExisteQuin) {
        showAlert(
          AlertState.ERROR,
          "Clave Inválida",
          "La clave proporcionada no es válida. Por favor, verifica e intenta nuevamente.",
        );
      }
    },
  });
}; */
