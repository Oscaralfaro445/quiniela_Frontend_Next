import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getMe = async () => {
  const response = await axiosInstance.post("/Query/GetMe", { idProceso: 21 });
  return response.data;
};

export const useGetMe = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    retry: false,
  });

  return { isLoading, isError, data, error };
};
