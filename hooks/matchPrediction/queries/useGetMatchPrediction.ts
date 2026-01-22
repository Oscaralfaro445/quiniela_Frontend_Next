import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
import { useQuery } from "@tanstack/react-query";

const fetchMatchPredictionv = async (payload: {
  idProceso: number;
  idQuery: number;
  parmRemp: { $1: number; $2: string; $3: number };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetMatchPrediction = (idPartido: number) => {
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["matchPrediction", idPartido],
    queryFn: () =>
      fetchMatchPredictionv({
        idProceso: 15,
        idQuery: 14,
        parmRemp: {
          $1: userInfo?.idQuiniela,
          $2: userInfo?.idPeriodo,
          $3: idPartido,
        },
      }),
    enabled: !!userInfo,
  });

  return { isPending, isError, isSuccess, error, data };
};
