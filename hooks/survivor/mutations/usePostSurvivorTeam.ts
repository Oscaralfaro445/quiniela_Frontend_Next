import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AlertState } from "@/types/alert/alert";
import { useAlert } from "@/context/alert/AlertContext";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";

const postSurvivorTeam = async (payload: {
  idProceso: number;
  model: string;
  data: {
    ID_QUINIELA: number;
    ID_PARTICIPANTE: number;
    ID_PERIODO: string;
    ID_EQUIPO_SUV: number;
    SITUACION: string;
    SITUACION_R: string;
    B_PAGO: boolean;
    B_RESUCITA: boolean;
  };
}) => {
  const response = await axiosInstance.post("/Crud/Crea", payload);
  return response.data;
};

export const usePostSurvivorTeam = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];
  const { showAlert } = useAlert();

  return useMutation({
    mutationKey: ["survivorTeam"],
    mutationFn: (idSurvivor: number) =>
      postSurvivorTeam({
        idProceso: 2,
        model: "Q_SURVIVOR",
        data: {
          ID_QUINIELA: userInfo?.idQuiniela,
          ID_PARTICIPANTE: userInfo?.idParticipante,
          ID_PERIODO: userInfo?.idPeriodo,
          ID_EQUIPO_SUV: idSurvivor,
          SITUACION: "P",
          SITUACION_R: "",
          B_PAGO: false,
          B_RESUCITA: false,
        },
      }),
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error al procesar la solicitud",
        "Tuvimos un problema al registrar al usuario",
      );
    },
    onSuccess: () => {
      showAlert(
        AlertState.SUCCESS,
        "Operación exitosa",
        "Quiniela almacenada con éxito",
      );
    },
  });
};
