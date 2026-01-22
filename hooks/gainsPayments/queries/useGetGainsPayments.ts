import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { useQuery } from "@tanstack/react-query";

const fetchGainsPayments = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: { $1: number };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetGainsPayments = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["gainsPayments"],
    queryFn: () =>
      fetchGainsPayments({
        idProceso: 16,
        idQuery: "15",
        parmRemp: { $1: userInfo?.idQuiniela },
      }),
    enabled: !!userInfo,
  });

  return { isPending, isError, isSuccess, error, data };
};
