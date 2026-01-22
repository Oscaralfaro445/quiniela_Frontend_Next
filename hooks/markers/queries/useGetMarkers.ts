import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { useQuery } from "@tanstack/react-query";

const fetchMarkers = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: { $1: string };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetMarkers = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["markers"],
    queryFn: () =>
      fetchMarkers({
        idProceso: 5,
        idQuery: "6",
        parmRemp: {
          $1: userInfo?.idPeriodo,
        },
      }),
    enabled: !!userInfo,
  });

  return { isPending, isError, isSuccess, data, error };
};
