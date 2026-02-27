import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useQuery } from "@tanstack/react-query";

const fetchMarkers = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: { $1: string };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetMarkers = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["markers"],
    queryFn: () =>
      fetchMarkers({
        idProceso: 5,
        idQuery: "6",
        parmRemp: {
          $1: user!.idPeriodo,
        },
      }),
    enabled: !!user,
  });
};
