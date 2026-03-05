import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { useQuery } from "@tanstack/react-query";

const fetchParticipantPositions = async (payload: {
  idProceso: number;
  idQuery: string;
  parmRemp: {
    $1: number;
    $2: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Consulta", payload);
  return response.data;
};

export const useGetParticipantPositions = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery({
    queryKey: ["participantPositions"],
    queryFn: () =>
      fetchParticipantPositions({
        idProceso: 3,
        idQuery: "4",
        parmRemp: {
          $1: user!.idQuiniela,
          $2: user!.idPeriodo,
        },
      }),
    enabled: !!user,
  });
};
