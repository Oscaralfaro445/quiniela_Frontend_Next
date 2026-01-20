import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "@/context/alert/AlertContext";
import { AlertState } from "@/types/alert/alert";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

const postSurvivorActivation = async (payload: {
  idProceso: number;
  model: string;
  data: {
    ID_QUINIELA: number;
    ID_PARTICIPANTE: number;
    ID_PERIODO: string;
    ID_EQUIPO_SUV: number;
    B_RESUCITA: boolean;
  };
}) => {
  const response = await axiosInstance.post("/Crud/Modifica", payload);
  return response.data;
};

export const usePostSurvivorActivation = () => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["survivorActivation"],
    mutationFn: ({
      idEquipo,
      bResucita,
    }: {
      idEquipo: number;
      bResucita: boolean;
    }) =>
      postSurvivorActivation({
        idProceso: 6,
        model: "Q_SURVIVOR",
        data: {
          ID_QUINIELA: 1,
          ID_PARTICIPANTE: 3,
          ID_PERIODO: "2",
          ID_EQUIPO_SUV: idEquipo,
          B_RESUCITA: bResucita,
        },
      }),
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error en la Solicitud",
        "Tuvimos un problema al solicitar la activación del survivor",
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["survivorStatus"] });
      handleRequestStatus({
        estatus: data.estatus,
        errorUs: data.errorUs,
        errorNeg: data.errorNeg,
        mensajeExito: "Activación del survivor realizada de forma correcta",
      });
    },
  });
};
