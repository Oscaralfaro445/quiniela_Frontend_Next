import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { useQuery } from "@tanstack/react-query";

const fetchUpcomingGames = async (payload: {
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

export const useGetUpcomingGames = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["upcomingGames"],
    queryFn: () =>
      fetchUpcomingGames({
        idProceso: 14,
        idQuery: 11,
        parmRemp: {
          $1: userInfo?.idQuiniela,
          $2: userInfo?.idPeriodo,
          $3: userInfo?.idParticipante,
        },
      }),
    enabled: !!userInfo,
  });
  return { isPending, isError, data, error };
};
