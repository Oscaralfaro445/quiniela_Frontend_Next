import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
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
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["simulator-matches"],
    queryFn: () =>
      fetchSimulatorMatches({
        idProceso: 17,
        idQuery: "16",
        parmRemp: {
          $1: userInfo?.idPeriodo,
        },
      }),
    enabled: !!userInfo,
  });
  return { isPending, isError, data, error };
};
