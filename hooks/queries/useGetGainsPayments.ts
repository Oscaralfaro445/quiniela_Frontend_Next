import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
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
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["gainsPayments"],
    queryFn: () =>
      fetchGainsPayments({
        idProceso: 16,
        idQuery: "15",
        parmRemp: { $1: user!.idQuiniela },
      }),
    enabled: !!user,
  });
};
