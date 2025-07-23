import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

const fetchParticipantStandings = async (payload: any) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

const useParticipantStandings = () => {
  const { dataUser } = useAuth();

  return useMutation({
    mutationFn: () =>
      fetchParticipantStandings({
        idProceso: 3,
        idQuery: "4",
        parmRemp: { $1: dataUser?.idQuiniela, $2: dataUser?.idPeriodo },
      }),
    onSuccess: (data) => {
      console.log("Data:", data);
    },
  });
};

export default useParticipantStandings;
