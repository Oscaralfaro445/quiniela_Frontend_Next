import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertState } from "@/types/alert/alert";
import { useAlert } from "@/context/alert/AlertContext";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

export interface survivorPayment {
  ID_QUINIELA: number;
  ID_PARTICIPANTE: number;
  ID_PERIODO: string;
  B_PAGO: boolean;
}

const postSurvivorPayment = async (payload: {
  idProceso: number;
  model: string;
  data: survivorPayment[];
}) => {
  const response = await axiosInstance.post("/Crud/BulkU", payload);
  return response.data;
};

export const usePostSurvivorPayment = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["survivorPayment"],
    mutationFn: (participants: survivorPayment[]) =>
      postSurvivorPayment({
        idProceso: 7,
        model: "Q_SURVIVOR",
        data: participants,
      }),
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error en la Solicitud",
        "Tuvimos un problema al actualizar la información de los pagos",
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["survivorPayment"] });
      handleRequestStatus({
        estatus: data.estatus,
        errorUs: data.errorUs,
        errorNeg: data.errorNeg,
        mensajeExito: "La actualización de los pagos se realizó con éxito",
      });
    },
  });
};
