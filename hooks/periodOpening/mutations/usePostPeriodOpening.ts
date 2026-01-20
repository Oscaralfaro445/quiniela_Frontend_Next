import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAlert } from "@/context/alert/AlertContext";
import { AlertState } from "@/types/alert/alert";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

const postPeriodOpening = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: { $1: number; $2: string };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const usePostPeriodOpening = () => {
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["periodOpening"],
    mutationFn: () =>
      postPeriodOpening({
        idProceso: 9,
        idProcedure: 6,
        parmRemp: { $1: 1, $2: "2" },
      }),
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error al procesar la solicitud",
        "Tuvimos un problema al iniciar sesión",
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
