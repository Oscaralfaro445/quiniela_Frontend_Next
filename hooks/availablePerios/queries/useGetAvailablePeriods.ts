import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { useQuery } from "@tanstack/react-query";

const fetchAvailablePeriods = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: number;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetAvailablePeriods = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["availablePeriods"],
    queryFn: () =>
      fetchAvailablePeriods({
        idProceso: 23,
        idQuery: "22",
        parmRemp: {
          $1: userInfo?.idQuiniela,
        },
      }),
    enabled: !!userInfo,
  });

  return { isPending, isError, data, error };
};
