import axiosInstances from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchSurvivorTeams = async (
  token: string,
  payload: {
    idProceso: number;
    idQuery: string;
    parmRemp: {
      $1: number;
      $2: number;
    };
  }
) => {
  const response = await axiosInstances.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useGetSurvivorTeams = () => {
  const { token, dataUser } = useAuth();

  return useQuery({
    queryKey: ["survivorTeams"],
    queryFn: () =>
      fetchSurvivorTeams(token!, {
        idProceso: 2,
        idQuery: "2",
        parmRemp: {
          $1: dataUser!.idQuiniela,
          $2: dataUser!.idParticipante,
        },
      }),
    enabled: !!token && !!dataUser?.idQuiniela && !!dataUser?.idParticipante,
  });
};

export default useGetSurvivorTeams;
