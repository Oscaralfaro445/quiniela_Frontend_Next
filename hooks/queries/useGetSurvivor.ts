import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useQuery } from "@tanstack/react-query";

const fetchSurvivor = async (payload: {
  idProceso: number;
  idQuery: number;
  parmRemp: {
    $1: number;
    $2: number;
    $3: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetSurvivor = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["survivor"],
    queryFn: () =>
      fetchSurvivor({
        idProceso: 14,
        idQuery: 12,
        parmRemp: {
          $1: user!.idQuiniela,
          $2: user!.idParticipante,
          $3: user!.idPeriodo,
        },
      }),
    enabled: !!user,
  });
};
