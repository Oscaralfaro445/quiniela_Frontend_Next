import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAlert } from "@/context/alert/AlertContext";
import { AlertState } from "@/types/alert/alert";

const validateKey = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: { $1: string };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useKeyValdiation = () => {
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
};
