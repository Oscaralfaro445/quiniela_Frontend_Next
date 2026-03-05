import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useQuery } from "@tanstack/react-query";

const fetchRanking = async (payload: {
  idProceso: number;
  idQuery: number;
  parmRemp: {
    $1: number;
    $2: string;
    $3: number;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetRanking = () => {
  const { data: user } = useGetMe();
  const userInfo: any = user?.data?.[0];

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["ranking"],
    queryFn: () =>
      fetchRanking({
        idProceso: 14,
        idQuery: 9,
        parmRemp: {
          $1: userInfo?.idQuiniela,
          $2: userInfo?.idPeriodo,
          $3: userInfo?.idParticipante,
        },
      }),
    enabled: !!userInfo,
  });
  return { isPending, isError, isSuccess, error, data };
};
