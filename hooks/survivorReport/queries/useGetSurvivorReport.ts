import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchSurvivorReport = async (
  token: string,
  payload: {
    idProceso: number;
    idProcedure: number;
    parmRemp: {
      $1: number;
    };
  }
) => {
  const response = await axiosInstance.post("/Query/Procedure", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetSurvivorReport = () => {
  const { token, dataUser } = useAuth();

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["survivorReport"],
    queryFn: () =>
      fetchSurvivorReport(token!, {
        idProceso: 4,
        idProcedure: 2,
        parmRemp: {
          $1: dataUser!.idQuiniela,
        },
      }),
    enabled: !!token && !!dataUser?.idQuiniela,
  });
  return { isPending, isError, isSuccess, error, data };
};
