import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAlert } from "@/context/alert/AlertContext";
import { AlertState } from "@/types/alert/alert";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";
import { axiosInstance } from "@/api/axiosInstance";

interface QuinielaData {
  ID_QUINIELA: number;
  ID_PARTICIPANTE: number;
  ID_PERIODO: string;
  ID_PARTIDO: number;
  CVE_GANADOR: string;
}

const postQuiniela = async (payload: {
  idProceso: number;
  model: string;
  data: QuinielaData[];
}) => {
  const response = await axiosInstance.post("/Crud/BulkU", payload);
  return response.data;
};

export const usePostQuiniela = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["quiniela"],
    mutationFn: (quinielaData: QuinielaData[]) =>
      postQuiniela({
        idProceso: 2,
        model: "Q_QUIN_PARTICIPANTE",
        data: quinielaData,
      }),
    onError: (error) => {
      showAlert(
        AlertState.ERROR,
        "Error en la Solicitud",
        "Tuvimos un problema al enviar la información de la quiniela, " +
          error.message,
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      handleRequestStatus({
        estatus: data.estatus,
        errorUs: data.errorUs,
        errorNeg: data.errorNeg,
        mensajeExito: "Tu quiniela ha sido actualizada correctamente",
      });
    },
  });
};
