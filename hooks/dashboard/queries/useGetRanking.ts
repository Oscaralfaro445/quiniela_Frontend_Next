import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchRanking = async (
  token: string,
  payload: {
    idProceso: number;
    idQuery: number;
    parmRemp: {
      $1: number;
      $2: string;
      $3: number;
    };
  }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetRanking = () => {
  const { token, dataUser } = useAuth();
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["ranking"],
    queryFn: () =>
      fetchRanking(token!, {
        idProceso: 14,
        idQuery: 9,
        parmRemp: {
          $1: dataUser!.idQuiniela,
          $2: dataUser!.idPeriodo,
          $3: dataUser!.idParticipante,
        },
      }),
    enabled:
      !!token &&
      !!dataUser?.idQuiniela &&
      !!dataUser?.idPeriodo &&
      !!dataUser?.idParticipante,
  });
  return { isPending, isError, isSuccess, error, data };
};
