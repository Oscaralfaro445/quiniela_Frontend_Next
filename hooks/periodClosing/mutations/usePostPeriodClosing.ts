import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";
import { AlertState } from "@/types/alert/alert";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

const postPeriodClosing = async (
  token: string,
  payload: {
    idProceso: number;
    idProcedure: number;
    parmRemp: { $1: number; $2: string };
  }
) => {
  const response = await axiosInstance.post("/Query/Procedure", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const usePostPeriodClosing = () => {
  const { token, dataUser } = useAuth();
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["periodClosing"],
    mutationFn: () =>
      postPeriodClosing(token!, {
        idProceso: 8,
        idProcedure: 5,
        parmRemp: { $1: dataUser!.idQuiniela, $2: dataUser!.idPeriodo },
      }),
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error al procesar la solicitud",
        "Tuvimos un problema al iniciar sesión"
      );
    },
    onSuccess: (data) => {
      handleRequestStatus({
        estatus: data.estatus,
        errorUs: data.errorUs,
        errorNeg: data.errorNeg,
        mensajeExito: "Inicio de sesión exitoso",
      });
    },
    onSettled: () => {},
  });
};
