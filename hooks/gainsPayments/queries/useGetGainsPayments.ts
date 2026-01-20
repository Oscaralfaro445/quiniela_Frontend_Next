import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchGainsPayments = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: { $1: number };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetGainsPayments = () => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["gainsPayments"],
    queryFn: () =>
      fetchGainsPayments({
        idProceso: 16,
        idQuery: "15",
        parmRemp: { $1: 1 },
      }),
  });

  return { isPending, isError, isSuccess, error, data };
};
