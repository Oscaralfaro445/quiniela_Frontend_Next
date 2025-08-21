import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";
import { AlertState } from "@/types/alert/alert";

const postSurvivorActivation = async (
  token: string,
  payload: {
    idProceso: number;
    model: string;
    data: {
      ID_QUINIELA: number;
      ID_PARTICIPANTE: number;
      ID_PERIODO: string;
      ID_EQUIPO_SUV: number;
      B_RESUCITA: boolean;
    };
  }
) => {
  const response = await axiosInstance.post("/Crud/Modifica", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const usePostSurvivorActivation = () => {
  const { token, dataUser } = useAuth();
  const { showAlert } = useAlert();
  return useMutation({
    mutationKey: ["survivorActivation"],
    mutationFn: ({
      idEquipo,
      bResucita,
    }: {
      idEquipo: number;
      bResucita: boolean;
    }) =>
      postSurvivorActivation(token!, {
        idProceso: 6,
        model: "Q_SURVIVOR",
        data: {
          ID_QUINIELA: dataUser!.idQuiniela,
          ID_PARTICIPANTE: dataUser!.idParticipante,
          ID_PERIODO: dataUser!.idPeriodo,
          ID_EQUIPO_SUV: idEquipo,
          B_RESUCITA: bResucita,
        },
      }),
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error en la Solicitud",
        "Tuvimos un problema al solicitar la activación del survivor"
      );
    },
    onSuccess: () => {
      showAlert(
        AlertState.SUCCESS,
        "Operación exitosa",
        "La actualización del survivor se realizó con éxito"
      );
    },
    onSettled: () => {},
  });
};

export default usePostSurvivorActivation;
