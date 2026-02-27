import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useQuery } from "@tanstack/react-query";

const fetchQuinielaVerification = async (payload: {
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

export const useGetQuinielaVerification = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["quinielaVerification"],
    queryFn: () =>
      fetchQuinielaVerification({
        idProceso: 10,
        idQuery: "8",
        parmRemp: {
          $1: user!.idQuiniela,
          $2: user!.idPeriodo,
        },
      }),
    enabled: !!user,
  });
};
