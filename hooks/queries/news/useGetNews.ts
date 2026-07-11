import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useQuery } from "@tanstack/react-query";

const getNews = async () => {
  const payload = {
    idProceso: 33,
    idQuery: 28,
  };

  const response = await axiosInstance.post("/Query/Consulta", payload);

  return response.data;
};

export const useGetNews = () => {
  return useQuery<ApiResponse<Noticia[]>, ApiError>({
    queryKey: ["news"],
    queryFn: getNews,
  });
};
interface Noticia {
  source: string;
  publishedDate: string;
  teamCode: string;
  headline: string;
  summary: string;
  articleUrl: string;
  playerName: string | null;
  category: string | null;
}
