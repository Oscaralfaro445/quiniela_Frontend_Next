import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
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
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["survivorStatus"],
    queryFn: () =>
      fetchSurvivorStatus({
        idProceso: 6,
        idProcedure: 3,
        parmRemp: {
          $1: user!.idQuiniela,
          $2: user!.idParticipante,
          $3: user!.idPeriodo,
        },
      }),
    enabled: !!user,
  });
};
