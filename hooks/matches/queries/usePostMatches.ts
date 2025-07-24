import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

const postMatches = async (
  token: string | null,
  payload: {
    idProceso: number;
    idQuery: string;
    parmRemp: { $1: number; $2: number; $3: number };
  }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const usePostMatches = (dataUser: any) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["matches"],
    queryFn: () =>
      postMatches(token, {
        idProceso: 2,
        idQuery: "1",
        parmRemp: {
          $1: dataUser.idQuiniela,
          $2: dataUser.idParticipante,
          $3: dataUser.idPeriodo,
        },
      }),
  });
};

export default usePostMatches;
