import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchScores = async (
  token: string,
  payload: { idProceso: number; idQuery: string; parmRemp: { $1: number } }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetScores = (idEquipo: number) => {
  const { token } = useAuth();

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["scores", idEquipo],
    queryFn: () =>
      fetchScores(token!, {
        idProceso: 2,
        idQuery: "3",
        parmRemp: { $1: idEquipo },
      }),
    enabled: !!token && !!idEquipo,
  });

  return { isPending, isError, isSuccess, error, data };
};
