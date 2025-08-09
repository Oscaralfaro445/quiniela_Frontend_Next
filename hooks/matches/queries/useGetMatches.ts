import axiosInstance from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

const fetchMatches = async (
  token: string,
  payload: {
    idProceso: number;
    idQuery: string;
    parmRemp: { $1: number; $2: number; $3: string };
  }
) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useGetMatches = () => {
  const { token, dataUser } = useAuth();

  return useQuery({
    queryKey: ["matches"],
    queryFn: () =>
      fetchMatches(token!, {
        idProceso: 2,
        idQuery: "1",
        parmRemp: {
          $1: dataUser!.idQuiniela,
          $2: dataUser!.idParticipante,
          $3: dataUser!.idPeriodo,
        },
      }),
    enabled:
      !!token &&
      !!dataUser?.idQuiniela &&
      !!dataUser?.idParticipante &&
      !!dataUser?.idPeriodo,
  });
};

export default useGetMatches;
