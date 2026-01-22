import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { useQuery } from "@tanstack/react-query";

const fetchSurvivorStatus = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: {
    $1: number;
    $2: number;
    $3: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const useGetSurvivorStatus = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["survivorStatus"],
    queryFn: () =>
      fetchSurvivorStatus({
        idProceso: 6,
        idProcedure: 3,
        parmRemp: {
          $1: userInfo?.idQuiniela,
          $2: userInfo?.idParticipante,
          $3: userInfo?.idPeriodo,
        },
      }),
    enabled: !!userInfo,
  });

  return { isPending, isError, isSuccess, error, data };
};
