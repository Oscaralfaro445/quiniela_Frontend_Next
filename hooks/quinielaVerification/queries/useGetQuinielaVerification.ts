import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { useQuery } from "@tanstack/react-query";

const fetchQuinielaVerification = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: number;
    $2: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetQuinielaVerification = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["quinielaVerification"],
    queryFn: () =>
      fetchQuinielaVerification({
        idProceso: 10,
        idQuery: "8",
        parmRemp: {
          $1: userInfo?.idQuiniela,
          $2: userInfo?.idPeriodo,
        },
      }),
    enabled: !!userInfo,
  });

  return { isPending, isError, isSuccess, error, data };
};
