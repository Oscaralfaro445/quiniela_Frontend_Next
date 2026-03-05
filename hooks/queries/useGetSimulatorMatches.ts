import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";

import { useQuery } from "@tanstack/react-query";

const fetchSimulatorMatches = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetSimulatorMatches = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["simulator-matches"],
    queryFn: () =>
      fetchSimulatorMatches({
        idProceso: 17,
        idQuery: "16",
        parmRemp: {
          $1: user!.idPeriodo,
        },
      }),
    enabled: !!user,
  });
};
