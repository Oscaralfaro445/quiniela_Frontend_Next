import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AlertState } from "@/types/alert/alert";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";

const postSurvivorTeam = async (
  token: string,
  payload: {
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
  }
) => {
  const response = await axiosInstance.post("/Crud/Crea", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const usePostSurvivorTeam = () => {
  const { token, dataUser } = useAuth();
  const { showAlert } = useAlert();

  return useMutation({
    mutationKey: ["survivorTeam"],
    mutationFn: (idSurvivor: number) =>
      postSurvivorTeam(token!, {
        idProceso: 2,
        model: "Q_SURVIVOR",
        data: {
          ID_QUINIELA: dataUser!.idQuiniela,
          ID_PARTICIPANTE: dataUser!.idParticipante,
          ID_PERIODO: dataUser!.idPeriodo,
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
        "Error de autenticación",
        "Usuario o contraseña incorrectos"
      );
    },
    onSuccess: () => {
      showAlert(
        AlertState.SUCCESS,
        "Operación exitosa",
        "Quiniela almacenada con éxito"
      );
    },
    onSettled: () => {},
  });
};

export default usePostSurvivorTeam;
