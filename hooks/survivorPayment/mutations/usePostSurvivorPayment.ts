import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AlertState } from "@/types/alert/alert";
import { Participant } from "@/types/participant/participant";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";

const postSurvivorPayment = async (
  token: string,
  payload: {
    idProceso: number;
    model: string;
    data: Participant[];
  }
) => {
  const response = await axiosInstance.post("/Crud/BulkU", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const usePostSurvivorPayment = () => {
  const { token } = useAuth();
  const { showAlert } = useAlert();

  return useMutation({
    mutationKey: ["survivorPayment"],
    mutationFn: ({ participants }: { participants: Participant[] }) =>
      postSurvivorPayment(token!, {
        idProceso: 7,
        model: "Q_SURVIVOR",
        data: participants,
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
        "La actualización de los pagos se realizó con éxito"
      );
    },
    onSettled: () => {},
  });
};

export default usePostSurvivorPayment;
