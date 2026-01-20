import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchAccumulatedBag = async (payload: {
  idProceso: number;
  idQuery: number;
  parmRemp: {
    $1: number;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetAccumulatedBag = () => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["bolsa"],
    queryFn: () =>
      fetchAccumulatedBag({
        idProceso: 14,
        idQuery: 13,
        parmRemp: { $1: 1 },
      }),
  });
  return { isPending, isError, isSuccess, error, data };
};
