import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchSurvivor = async (payload: {
  idProceso: number;
  idQuery: number;
  parmRemp: {
    $1: number;
    $2: number;
    $3: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetSurvivor = () => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["survivor"],
    queryFn: () =>
      fetchSurvivor({
        idProceso: 14,
        idQuery: 12,
        parmRemp: {
          $1: 1,
          $2: 3,
          $3: "2",
        },
      }),
  });
  return { isPending, isError, isSuccess, error, data };
};
