import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchScores = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: { $1: number };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetScores = (idEquipo: number) => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["scores", idEquipo],
    queryFn: () =>
      fetchScores({
        idProceso: 2,
        idQuery: "3",
        parmRemp: { $1: idEquipo },
      }),
  });

  return { isPending, isError, isSuccess, error, data };
};
