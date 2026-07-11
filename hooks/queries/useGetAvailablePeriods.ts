import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useQuery } from "@tanstack/react-query";

const fetchAvailablePeriods = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: number;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);

  return response.data;
};

export const useGetAvailablePeriods = () => {
  const { data: user } = useGetMe();
  const userInfo = user?.data?.[0];

  return useQuery({
    queryKey: ["availablePeriods"],
    queryFn: () =>
      fetchAvailablePeriods({
        idProceso: 23,
        idQuery: "22",
        parmRemp: {
          $1: userInfo!.idQuiniela,
        },
      }),
    enabled: !!userInfo,
  });
};
