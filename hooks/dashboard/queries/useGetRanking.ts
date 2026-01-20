import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchRanking = async (payload: {
  idProceso: number;
  idQuery: number;
  parmRemp: {
    $1: number;
    $2: string;
    $3: number;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetRanking = () => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["ranking"],
    queryFn: () =>
      fetchRanking({
        idProceso: 14,
        idQuery: 9,
        parmRemp: {
          $1: 1,
          $2: "2",
          $3: 3,
        },
      }),
  });
  return { isPending, isError, isSuccess, error, data };
};
