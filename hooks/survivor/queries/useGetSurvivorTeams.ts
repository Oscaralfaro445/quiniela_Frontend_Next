import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchSurvivorTeams = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: number;
    $2: number;
    $3: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetSurvivorTeams = () => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["survivorTeams"],
    queryFn: () =>
      fetchSurvivorTeams({
        idProceso: 2,
        idQuery: "2",
        parmRemp: {
          $1: 1,
          $2: 2,
          $3: "2",
        },
      }),
  });

  return { isPending, isError, isSuccess, error, data };
};
