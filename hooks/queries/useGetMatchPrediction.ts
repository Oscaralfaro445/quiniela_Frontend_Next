import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
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
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["matchPrediction", idPartido],
    queryFn: () =>
      fetchMatchPredictionv({
        idProceso: 15,
        idQuery: 14,
        parmRemp: {
          $1: user!.idQuiniela,
          $2: user!.idPeriodo,
          $3: idPartido,
        },
      }),
    enabled: !!user,
  });
};
