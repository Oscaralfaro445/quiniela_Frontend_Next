import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchGainsPayments = async (
  token: string,
  payload: {
    idProceso: number;
    idQuery: string;
    parmRemp: { $1: number };
  }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetGainsPayments = () => {
  const { token, dataUser } = useAuth();

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["gainsPayments"],
    queryFn: () =>
      fetchGainsPayments(token!, {
        idProceso: 16,
        idQuery: "15",
        parmRemp: { $1: dataUser!.idQuiniela },
      }),
    enabled: !!token && !!dataUser?.idQuiniela,
  });

  return { isPending, isError, isSuccess, error, data };
};
