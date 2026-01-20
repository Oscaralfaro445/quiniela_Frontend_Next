import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AlertState } from "@/types/alert/alert";
import { useAlert } from "@/context/alert/AlertContext";

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
  const { showAlert } = useAlert();

  return useMutation({
    mutationKey: ["survivorTeam"],
    mutationFn: (idSurvivor: number) =>
      postSurvivorTeam({
        idProceso: 2,
        model: "Q_SURVIVOR",
        data: {
          ID_QUINIELA: 1,
          ID_PARTICIPANTE: 3,
          ID_PERIODO: "2",
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
        "Usuario o contraseña incorrectos",
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
