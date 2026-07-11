import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
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
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["upcomingGames"],
    queryFn: () =>
      fetchUpcomingGames({
        idProceso: 14,
        idQuery: 11,
        parmRemp: {
          $1: user!.idQuiniela,
          $2: user!.idPeriodo,
          $3: user!.idParticipante,
        },
      }),
    enabled: !!user,
  });
};
