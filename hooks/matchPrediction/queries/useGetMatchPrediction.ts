import axiosInstance from "@/hooks/axios/axiosInstance";
import { useAuth } from "@/context/authContext/AuthContext";
import { useQuery } from "@tanstack/react-query";

const fetchMatchPredictionv = async (
  token: string,
  payload: {
    idProceso: number;
    idQuery: number;
    parmRemp: { $1: number; $2: string; $3: number };
  }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetMatchPrediction = (idPartido: number) => {
  const { token, dataUser } = useAuth();

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["matchPrediction", idPartido],
    queryFn: () =>
      fetchMatchPredictionv(token!, {
        idProceso: 15,
        idQuery: 14,
        parmRemp: {
          $1: dataUser!.idQuiniela,
          $2: dataUser!.idPeriodo,
          $3: idPartido,
        },
      }),
    enabled:
      !!token && !!dataUser?.idQuiniela && !!dataUser?.idPeriodo && !!idPartido,
  });

  return { isPending, isError, isSuccess, error, data };
};
