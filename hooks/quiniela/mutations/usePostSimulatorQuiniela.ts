import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";

import { useMutation } from "@tanstack/react-query";

const postQuinielaSimulator = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: {
    $1: number;
    $2: string;
    $3: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const usePostSimulatorQuiniela = () => {
  const { data: user } = useGetMe();
  const userInfo: any = user?.data?.[0];

  return useMutation({
    mutationKey: ["quiniela-simulator"],
    mutationFn: (quinielaDataSimulated: string) =>
      postQuinielaSimulator({
        idProceso: 17,
        idProcedure: 8,
        parmRemp: {
          $1: userInfo?.idQuiniela,
          $2: userInfo?.idPeriodo,
          $3: quinielaDataSimulated,
        },
      }),
  });
};
