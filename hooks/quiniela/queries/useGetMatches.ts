import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { useQuery } from "@tanstack/react-query";

const fetchMatches = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: { $1: number; $2: number; $3: string };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetMatches = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["matches"],
    queryFn: () =>
      fetchMatches({
        idProceso: 2,
        idQuery: "1",
        parmRemp: {
          $1: userInfo?.idQuiniela,
          $2: userInfo?.idParticipante,
          $3: userInfo?.idPeriodo,
        },
      }),
    enabled: !!userInfo,
  });
  return { isPending, isError, data, error };
};
