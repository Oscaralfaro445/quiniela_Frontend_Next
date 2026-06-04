import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useQuery } from "@tanstack/react-query";

const getProcessStatus = async (): Promise<ApiResponse<any>> => {
  const payload = {
    idProceso: 2,
    idProcedure: 14,
    parmRemp: { $1: 1, $2: 12 },
  };

  const response = await axiosInstance.post<ApiResponse<any>>(
    "/Query/Procedure",
    payload,
  );

  return response.data;
};

export const useGetProcessStatus = () => {
  return useQuery<ApiResponse<any>, ApiError>({
    queryKey: ["getProcessStatus"],
    queryFn: getProcessStatus,
  });
};
