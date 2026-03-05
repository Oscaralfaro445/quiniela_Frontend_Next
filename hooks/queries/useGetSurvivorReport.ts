import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useQuery } from "@tanstack/react-query";

const fetchSurvivorReport = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: {
    $1: number;
  };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const useGetSurvivorReport = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["survivorReport"],
    queryFn: () =>
      fetchSurvivorReport({
        idProceso: 4,
        idProcedure: 2,
        parmRemp: {
          $1: user!.idQuiniela,
        },
      }),
    enabled: !!user,
  });
};
