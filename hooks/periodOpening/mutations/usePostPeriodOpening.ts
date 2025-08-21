import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const postPeriodOpening = async (
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

const usePostPeriodOpening = () => {
  const { token, dataUser } = useAuth();

  return useMutation({
    mutationKey: ["periodOpening"],
    mutationFn: () =>
      postPeriodOpening(token!, {
        idProceso: 9,
        idProcedure: 6,
        parmRemp: { $1: dataUser!.idQuiniela, $2: dataUser!.idPeriodo },
      }),
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};

export default usePostPeriodOpening;
