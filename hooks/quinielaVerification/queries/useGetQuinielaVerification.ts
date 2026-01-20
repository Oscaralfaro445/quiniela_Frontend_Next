import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchQuinielaVerification = async (payload: {
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

export const useGetQuinielaVerification = () => {
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["quinielaVerification"],
    queryFn: () =>
      fetchQuinielaVerification({
        idProceso: 10,
        idQuery: "8",
        parmRemp: {
          $1: 1,
          $2: "2",
        },
      }),
  });

  return { isPending, isError, isSuccess, error, data };
};
