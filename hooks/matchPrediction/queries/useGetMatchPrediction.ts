import { axiosInstance } from "@/hooks/axios/axiosInstance";
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
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["matchPrediction", idPartido],
    queryFn: () =>
      fetchMatchPredictionv({
        idProceso: 15,
        idQuery: 14,
        parmRemp: {
          $1: 1,
          $2: "2",
          $3: idPartido,
        },
      }),
  });

  return { isPending, isError, isSuccess, error, data };
};
