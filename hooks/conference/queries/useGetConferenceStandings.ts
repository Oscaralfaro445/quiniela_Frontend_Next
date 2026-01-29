import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getConferenceStandings = async () => {
  const response = await axiosInstance.post("/Query/Consulta", {
    idProceso: 19,
    idQuery: 18,
  });
  return response.data;
};

export const useGetConferenceStandings = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["conferenceStandings"],
    queryFn: getConferenceStandings,
  });
  return { isPending, isError, data, error };
};
