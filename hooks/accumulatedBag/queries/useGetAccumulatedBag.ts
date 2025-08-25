import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchAccumulatedBag = async (
  token: string,
  payload: { idProceso: number; idQuery: number }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetAccumulatedBag = () => {
  const { token } = useAuth();

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["bolsa"],
    queryFn: () => fetchAccumulatedBag(token!, { idProceso: 14, idQuery: 13 }),
    enabled: !!token,
  });
  return { isPending, isError, isSuccess, error, data };
};
