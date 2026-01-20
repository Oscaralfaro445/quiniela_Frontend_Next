import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchMatches = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: { $1: number; $2: number; $3: string };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetMatches = () => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["matches"],
    queryFn: () =>
      fetchMatches({
        idProceso: 2,
        idQuery: "1",
        parmRemp: {
          $1: 1,
          $2: 3,
          $3: "2",
        },
      }),
  });
  return { isPending, isError, isSuccess, error, data };
};
