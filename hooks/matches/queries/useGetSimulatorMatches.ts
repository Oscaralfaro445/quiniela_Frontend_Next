import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchSimulatorMatches = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetSimulatorMatches = () => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["simulator-matches"],
    queryFn: () =>
      fetchSimulatorMatches({
        idProceso: 17,
        idQuery: "16",
        parmRemp: {
          $1: "2",
        },
      }),
  });
  return { isPending, isError, isSuccess, error, data };
};
