import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchSimulatorMatches = async (
  token: string,
  payload: {
    idProceso: number;
    idQuery: string;
    parmRemp: {
      $1: string;
    };
  }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetSimulatorMatches = () => {
  const { token, dataUser } = useAuth();

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["simulator-matches"],
    queryFn: () =>
      fetchSimulatorMatches(token!, {
        idProceso: 17,
        idQuery: "16",
        parmRemp: {
          $1: dataUser!.idPeriodo,
        },
      }),
    enabled: !!token && !!dataUser?.idPeriodo,
  });
  return { isPending, isError, isSuccess, error, data };
};
