import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

interface SurvivorPaymentPayload {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: string | number;
    $2: number;
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

const useGetSurvivorPayment = () => {
  const { token, dataUser } = useAuth();

  return useQuery({
    queryKey: ["survivorPayment"],
    queryFn: () => {
      /* if (!token) {
        throw new Error("Authentication token is required");
      } */

      /* if (!dataUser?.idQuiniela || !dataUser?.idPeriodo) {
        throw new Error("User data (idQuiniela or idPeriodo) is missing");
      } */

      const idPeriodo = Number(dataUser?.idPeriodo);

      /* if (isNaN(idPeriodo)) {
        throw new Error("Invalid idPeriodo value");
      } */

      const previousPeriodo = idPeriodo - 1;

      return fetchSurvivorPayment(token!, {
        idProceso: 7,
        idQuery: "7",
        parmRemp: {
          $1: dataUser!.idQuiniela,
          $2: previousPeriodo,
        },
      });
    },
    enabled: !!token && !!dataUser?.idQuiniela && !!dataUser?.idPeriodo,
    // staleTime: 5 * 60 * 1000,
    // retry: 2,
  });
};

export default useGetSurvivorPayment;
