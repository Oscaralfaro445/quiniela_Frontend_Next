import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchParticipantPositions = async (
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

const useGetParticipantPositions = () => {
  const { token, dataUser } = useAuth();

  return useQuery({
    queryKey: ["participantPositions"],
    queryFn: () =>
      fetchParticipantPositions(token!, {
        idProceso: 3,
        idQuery: "4",
        parmRemp: {
          $1: dataUser!.idQuiniela,
          $2: dataUser!.idPeriodo,
        },
      }),
    enabled: !!token && !!dataUser?.idQuiniela && !!dataUser?.idPeriodo,
  });
};

export default useGetParticipantPositions;
