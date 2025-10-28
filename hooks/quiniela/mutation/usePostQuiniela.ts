import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";
import { AlertState } from "@/types/alert/alert";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

interface QuinielaData {
  ID_QUINIELA: number;
  ID_PARTICIPANTE: number;
  ID_PERIODO: string;
  ID_PARTIDO: number;
  CVE_GANADOR: string;
}

const postQuiniela = async (
  token: string,
  payload: {
    idProceso: number;
    model: string;
    data: QuinielaData[];
  }
) => {
  const response = await axiosInstance.post("/Crud/BulkU", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const usePostQuiniela = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["quiniela"],
    mutationFn: (quinielaData: QuinielaData[]) =>
      postQuiniela(token!, {
        idProceso: 2,
        model: "Q_QUIN_PARTICIPANTE",
        data: quinielaData,
      }),
    onError: (error) => {
      showAlert(
        AlertState.ERROR,
        "Error en la Solicitud",
        "Tuvimos un problema al enviar la información de la quiniela, " +
          error.message
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
    onSettled: () => {},
  });
};
