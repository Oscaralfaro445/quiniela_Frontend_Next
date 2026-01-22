import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { AlertState } from "@/types/alert/alert";
import { useAlert } from "@/context/alert/AlertContext";
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
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];
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
          ID_QUINIELA: userInfo?.idQuiniela,
          ID_PARTICIPANTE: userInfo?.idParticipante,
          ID_PERIODO: userInfo?.idPeriodo,
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
