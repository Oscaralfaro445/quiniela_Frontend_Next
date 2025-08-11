import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchSurvivorStatus = async (
  token: string,
  payload: {
    idProceso: number;
    idProcedure: number;
    parmRem: {
      $1: number;
      $2: number;
      $3: string;
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

const useGetSurvivorStatus = () => {
  const { token, dataUser } = useAuth();

  return useQuery({
    queryKey: ["survivorStatus"],
    queryFn: () =>
      fetchSurvivorStatus(token!, {
        idProceso: 6,
        idProcedure: 3,
        parmRem: {
          $1: dataUser!.idQuiniela,
          $2: dataUser!.idParticipante,
          $3: dataUser!.idPeriodo,
        },
      }),
    enabled: !!token && !!dataUser,
  });
};

export default useGetSurvivorStatus;
