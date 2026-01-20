import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getMe = async (idProceso: number) => {
  const response = await axiosInstance.post("/Query/GetMe", { idProceso });
  return response.data;
};

export const useGetMe = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => getMe(21),
    retry: false,
  });

  return { isLoading, isError, data, error };
};
