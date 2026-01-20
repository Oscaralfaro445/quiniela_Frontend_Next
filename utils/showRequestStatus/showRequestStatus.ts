import { useAlert } from "@/context/alert/AlertContext";
import { AlertState } from "@/types/alert/alert";

type RequestStatus = {
  estatus: number;
  errorUs: string | null;
  errorNeg: string | null;
  mensajeExito: string;
};

export const useHandleRequestStatus = () => {
  const { showAlert } = useAlert();

  const handleRequestStatus = ({
    mensajeExito,
    estatus,
    errorUs,
  }: RequestStatus) => {
    switch (estatus) {
      case 1:
        showAlert(
          AlertState.SUCCESS,
          "Solicitud procesada con éxito",
          mensajeExito,
        );
        break;

      case 2:
        showAlert(
          AlertState.ERROR,
          "Error en la Solicitud",
          errorUs ??
            "Tuvimos un problema al procesar tu solicitud. Inténtalo más tarde.",
        );
        break;

      case 3:
        showAlert(
          AlertState.ERROR,
          "Error en la Solicitud",
          "Ocurrió un error en la validación de negocio.",
        );
        break;

      case 4:
        showAlert(
          AlertState.ERROR,
          "Error al validar las credenciales",
          errorUs ??
            "Tuvimos un problema al procesar tu solicitud. Inténtalo más tarde.",
        );
        break;

      default:
        showAlert(
          AlertState.WARNING,
          "Estado no reconocido",
          `Recibimos un código de estado inesperado: ${status}`,
        );
        break;
    }
  };

  return { handleRequestStatus };
};
