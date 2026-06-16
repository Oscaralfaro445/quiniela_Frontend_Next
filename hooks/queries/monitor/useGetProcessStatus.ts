import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import { useGetMe } from "../user/useGetMe";

const getProcessStatus = async (
  idPeriodo: string,
): Promise<ApiResponse<any>> => {
  const payload = {
    idProceso: 2,
    idProcedure: 14,
    parmRemp: { $1: idPeriodo },
  };

  const response = await axiosInstance.post<ApiResponse<any>>(
    "/Query/Procedure",
    payload,
  );

  return response.data;
};

export const useGetProcessStatus = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery<ApiResponse<any>, ApiError>({
    queryKey: ["getProcessStatus", user?.idPeriodo ?? "unknown"],
    queryFn: () => getProcessStatus(user!.idPeriodo),
  });
};
