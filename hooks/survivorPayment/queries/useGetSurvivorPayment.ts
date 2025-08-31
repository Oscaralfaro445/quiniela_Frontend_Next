import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

interface SurvivorPaymentPayload {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: number;
    $2: string;
  };
}

const fetchSurvivorPayment = async (
  token: string,
  payload: SurvivorPaymentPayload
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useGetSurvivorPayment = () => {
  const { token, dataUser } = useAuth();

  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["survivorPayment"],
    queryFn: () => {
      return fetchSurvivorPayment(token!, {
        idProceso: 7,
        idQuery: "7",
        parmRemp: {
          $1: dataUser!.idQuiniela,
          $2: dataUser!.idPeriodo,
        },
      });
    },
    enabled: !!token && !!dataUser?.idQuiniela && !!dataUser?.idPeriodo,
  });

  return { isPending, isError, isSuccess, error, data };
};
