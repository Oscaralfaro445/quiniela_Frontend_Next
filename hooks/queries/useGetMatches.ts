import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
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
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["matches"],
    queryFn: () =>
      fetchMatches({
        idProceso: 2,
        idQuery: "1",
        parmRemp: {
          $1: user!.idQuiniela,
          $2: user!.idParticipante,
          $3: user!.idPeriodo,
        },
      }),
    enabled: !!user,
  });
};
