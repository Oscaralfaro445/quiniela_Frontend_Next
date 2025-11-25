import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const postQuinielaSimulator = async (
  token: string,
  payload: {
    idProceso: number;
    idProcedure: number;
    parmRemp: {
      $1: number;
      $2: string;
      $3: string;
    };
  }
) => {
  const response = await axiosInstance.post("/Query/Procedure", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const usePostSimulatorQuiniela = () => {
  const { token, dataUser } = useAuth();

  return useMutation({
    mutationKey: ["quiniela-simulator"],
    mutationFn: (quinielaDataSimulated: string) =>
      postQuinielaSimulator(token!, {
        idProceso: 17,
        idProcedure: 8,
        parmRemp: {
          $1: dataUser!.idQuiniela,
          $2: dataUser!.idPeriodo,
          $3: quinielaDataSimulated,
        },
      }),
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};
