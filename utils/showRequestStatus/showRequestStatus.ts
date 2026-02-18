import { useAlert } from "@/context/alert/AlertContext";
import { AlertState } from "@/types/alert/alert";

type RequestStatus = {
  estatus: number | undefined;
  errorUs?: string | null;
  errorNeg?: string[] | null;
  error?: string;
  mensajeExito?: string;
};

export const useHandleRequestStatus = () => {
  const { showAlert } = useAlert();

  const handleRequestStatus = ({
    estatus,
    errorUs,
    errorNeg,
    error,
    mensajeExito,
  }: RequestStatus) => {
    switch (estatus) {
      case 1:
        showAlert(
          AlertState.SUCCESS,
          "Solicitud procesada con éxito",
          mensajeExito ?? "",
        );
        break;

      case 2:
        showAlert(
          AlertState.ERROR,
          "Error en la solicitud",
          errorUs ??
            "Tuvimos un problema al procesar tu solicitud. Inténtalo más tarde.",
        );
        break;

      case 3:
        console.warn("Aqui va el modal.", errorNeg);
        break;

      default:
        showAlert(
          AlertState.ERROR,
          "Error al procesar la solicitud",
          error ?? "",
        );
        break;
    }
  };

  return { handleRequestStatus };
};
