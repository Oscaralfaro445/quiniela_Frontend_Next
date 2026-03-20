import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertState } from "@/types/alert/alert";
import { useAlert } from "@/context/alert/AlertContext";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";
import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";

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
    },
    onSettled: (data, error: ApiError | null) => {
      const requestData = data || error?.response?.data;
      handleRequestStatus({
        estatus: requestData?.estatus,
        errorUs: requestData?.errorUs ?? "",
        errorNeg: requestData?.errorNeg ?? [],
        error: error?.message ?? "",
        mensajeExito: "La actualización de los pagos se realizó con éxito",
      });
    },
  });
};
