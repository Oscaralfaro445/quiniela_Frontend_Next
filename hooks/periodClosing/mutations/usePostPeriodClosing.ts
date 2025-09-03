import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

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

  return useMutation({
    mutationKey: ["periodClosing"],
    mutationFn: () =>
      postPeriodClosing(token!, {
        idProceso: 8,
        idProcedure: 5,
        parmRemp: { $1: dataUser!.idQuiniela, $2: dataUser!.idPeriodo },
      }),
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};
