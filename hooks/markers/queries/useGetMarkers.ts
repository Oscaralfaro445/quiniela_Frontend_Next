import { axiosInstance } from "@/hooks/axios/axiosInstance";
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
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["markers"],
    queryFn: () =>
      fetchMarkers({
        idProceso: 5,
        idQuery: "6",
        parmRemp: {
          $1: "2",
        },
      }),
  });

  return { isPending, isError, isSuccess, error, data };
};
