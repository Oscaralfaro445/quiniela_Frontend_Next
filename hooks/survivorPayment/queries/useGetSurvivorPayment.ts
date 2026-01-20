import { axiosInstance } from "@/hooks/axios/axiosInstance";
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
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["survivorPayment"],
    queryFn: () => {
      return fetchSurvivorPayment({
        idProceso: 7,
        idQuery: "7",
        parmRemp: {
          $1: 1,
          $2: "2",
        },
      });
    },
  });

  return { isPending, isError, isSuccess, error, data };
};
