import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { DataUser } from "@/types/user/dataUser";
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
  const { data: user } = useGetMe();
  const userInfo: DataUser = user?.data?.[0];

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["participantPositions"],
    queryFn: () =>
      fetchParticipantPositions({
        idProceso: 3,
        idQuery: "4",
        parmRemp: {
          $1: userInfo?.idQuiniela,
          $2: userInfo?.idPeriodo,
        },
      }),
    enabled: !!userInfo,
  });
  return { isPending, isError, data, error };
};
