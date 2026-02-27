import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
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
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["bolsa"],
    queryFn: () =>
      fetchAccumulatedBag({
        idProceso: 14,
        idQuery: 13,
        parmRemp: { $1: user!.idQuiniela },
      }),
    enabled: !!user,
  });
};
