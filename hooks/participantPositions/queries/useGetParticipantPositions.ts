import { axiosInstance } from "@/hooks/axios/axiosInstance";
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
  const { isPending, isError, isSuccess, error, data } = useQuery({
    queryKey: ["participantPositions"],
    queryFn: () =>
      fetchParticipantPositions({
        idProceso: 3,
        idQuery: "4",
        parmRemp: {
          $1: 1,
          $2: "2",
        },
      }),
  });
  return { isPending, isError, isSuccess, error, data };
};
