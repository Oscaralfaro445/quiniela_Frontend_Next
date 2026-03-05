import { useMutation } from "@tanstack/react-query";
import { useAlert } from "@/context/alert/AlertContext";
import { AlertState } from "@/types/alert/alert";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";
import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";

const postPeriodClosing = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: { $1: number; $2: string };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const usePostPeriodClosing = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["periodClosing"],
    mutationFn: () =>
      postPeriodClosing({
        idProceso: 8,
        idProcedure: 5,
        parmRemp: { $1: user!.idQuiniela, $2: user!.idPeriodo },
      }),
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error al procesar la solicitud",
        "Tuvimos un problema al iniciar sesión",
      );
    },
    onSuccess: (data) => {
      console.log("Response data:", data);
      handleRequestStatus({
        estatus: data.estatus,
        errorUs: data.errorUs,
        errorNeg: data.errorNeg,
        mensajeExito: "Inicio de sesión exitoso",
      });
    },
  });
};
