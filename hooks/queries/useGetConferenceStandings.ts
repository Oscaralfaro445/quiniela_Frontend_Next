import { axiosInstance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getConferenceStandings = async () => {
  const response = await axiosInstance.post("/Query/Consulta", {
    idProceso: 19,
    idQuery: 18,
  });
  return response.data;
};

export const useGetConferenceStandings = () => {
  return useQuery({
    queryKey: ["conferenceStandings"],
    queryFn: getConferenceStandings,
  });
};
