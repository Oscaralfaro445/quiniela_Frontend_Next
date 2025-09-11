import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchAccumulatedBag = async (
  token: string,
  payload: {
    idProceso: number;
    idQuery: number;
    parmRemp: {
      $1: number;
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

export const useGetAccumulatedBag = () => {
  const { token, dataUser } = useAuth();

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["bolsa"],
    queryFn: () =>
      fetchAccumulatedBag(token!, {
        idProceso: 14,
        idQuery: 13,
        parmRemp: { $1: dataUser!.idQuiniela },
      }),
    enabled: !!token && !!dataUser?.idQuiniela,
  });
  return { isPending, isError, isSuccess, error, data };
};
