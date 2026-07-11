import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useQuery } from "@tanstack/react-query";

const fetchSurvivorPayment = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: number;
    $2: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetSurvivorPayment = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["survivorPayment"],
    queryFn: () => {
      return fetchSurvivorPayment({
        idProceso: 7,
        idQuery: "7",
        parmRemp: {
          $1: user!.idQuiniela,
          $2: user!.idPeriodo,
        },
      });
    },
    enabled: !!user,
  });
};
