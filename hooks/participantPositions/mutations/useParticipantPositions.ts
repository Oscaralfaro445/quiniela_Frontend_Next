import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const fetchParticipantPositions = async (token: string, payload: any) => {
  const response = await axiosInstance.post("/Query/Consulta", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useParticipantPositions = () => {
  return useMutation({
    mutationKey: ["participantPositions"],
    mutationFn: ({ token, dataUser }: { token: string; dataUser: any }) =>
      fetchParticipantPositions(token, {
        idProceso: 3,
        idQuery: "4",
        parmRemp: { $1: dataUser.idQuiniela, $2: dataUser.idPeriodo },
      }),
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {},
  });
};

export default useParticipantPositions;
