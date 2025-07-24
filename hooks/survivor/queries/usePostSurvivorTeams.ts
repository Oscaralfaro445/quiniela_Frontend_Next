import axiosInstances from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

const postSurvivorTeams = async (token: string | null, payload: any) => {
  const response = await axiosInstances.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const usePostSurvivorTeams = (dataUser: any) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["survivorTeams"],
    queryFn: () =>
      postSurvivorTeams(token, {
        idProceso: 2,
        idQuery: "2",
        parmRemp: {
          $1: dataUser.idQuiniela,
          $2: dataUser.idParticipante,
        },
      }),
  });
};

export default usePostSurvivorTeams;
