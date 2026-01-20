import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchSurvivorStatus = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: {
    $1: number;
    $2: number;
    $3: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const useGetSurvivorStatus = () => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["survivorStatus"],
    queryFn: () =>
      fetchSurvivorStatus({
        idProceso: 6,
        idProcedure: 3,
        parmRemp: {
          $1: 1,
          $2: 3,
          $3: "2",
        },
      }),
  });

  return { isPending, isError, isSuccess, error, data };
};
