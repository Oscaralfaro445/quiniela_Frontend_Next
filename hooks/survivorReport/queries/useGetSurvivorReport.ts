import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchSurvivorReport = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: {
    $1: number;
  };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const useGetSurvivorReport = () => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["survivorReport"],
    queryFn: () =>
      fetchSurvivorReport({
        idProceso: 4,
        idProcedure: 2,
        parmRemp: {
          $1: 1,
        },
      }),
  });
  return { isPending, isError, isSuccess, error, data };
};
