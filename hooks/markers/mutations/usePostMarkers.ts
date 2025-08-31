import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";
import { AlertState } from "@/types/alert/alert";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

interface Marker {
  ID_PERIODO: string;
  ID_PARTIDO: number;
  ID_SCORE_E1: number;
  ID_SCORE_E2: number;
}

const postMarkers = async (
  token: string,
  payload: {
    idProceso: number;
    model: string;
    data: Marker[];
  }
) => {
  const response = await axiosInstance.post("/Crud/BulkU", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const usePostMarkers = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["markers"],
    mutationFn: (markersData: Marker[]) =>
      postMarkers(token!, {
        idProceso: 5,
        model: "Q_PARTIDO",
        data: markersData,
      }),
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error en la Solicitud",
        "Tuvimos un problema al actualizar la información de los marcadores"
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["markers"] });
      handleRequestStatus({
        estatus: data.estatus,
        errorUs: data.errorUs,
        errorNeg: data.errorNeg,
        mensajeExito: "Actualización de marcadores realizada de forma correcta",
      });
    },
    onSettled: () => {},
  });
};
