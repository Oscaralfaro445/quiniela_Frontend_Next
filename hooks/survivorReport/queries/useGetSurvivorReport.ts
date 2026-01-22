import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
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
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["survivorReport"],
    queryFn: () =>
      fetchSurvivorReport({
        idProceso: 4,
        idProcedure: 2,
        parmRemp: {
          $1: userInfo?.idQuiniela,
        },
      }),
    enabled: !!userInfo,
  });
  return { isPending, isError, data, error };
};
