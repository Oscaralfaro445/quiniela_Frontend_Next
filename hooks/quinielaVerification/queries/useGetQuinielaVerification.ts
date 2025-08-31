import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchQuinielaVerification = async (
  token: string,
  payload: {
    idProceso: number;
    idQuery: string;
    parmRemp: {
      $1: number;
      $2: string;
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

export const useGetQuinielaVerification = () => {
  const { token, dataUser } = useAuth();

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["quinielaVerification"],
    queryFn: () =>
      fetchQuinielaVerification(token!, {
        idProceso: 10,
        idQuery: "8",
        parmRemp: {
          $1: dataUser!.idQuiniela,
          $2: dataUser!.idPeriodo,
        },
      }),
    enabled: !!token && !!dataUser?.idQuiniela && !!dataUser?.idPeriodo,
  });

  return { isPending, isError, isSuccess, error, data };
};
