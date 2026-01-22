import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { useQuery } from "@tanstack/react-query";

const fetchSurvivorPayment = async (payload: {
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

export const useGetSurvivorPayment = () => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["survivorPayment"],
    queryFn: () => {
      return fetchSurvivorPayment({
        idProceso: 7,
        idQuery: "7",
        parmRemp: {
          $1: userInfo?.idQuiniela,
          $2: userInfo?.idPeriodo,
        },
      });
    },
    enabled: !!userInfo,
  });

  return { isPending, isError, isSuccess, error, data };
};
