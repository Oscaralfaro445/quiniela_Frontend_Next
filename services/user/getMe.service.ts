import { axiosInstance } from "@/api/axiosInstance";
import { ApiResponse } from "@/types/api/ApiResponse";
import { GetMeResponse } from "@/types/user/user.types";

export const getMe = async (): Promise<ApiResponse<GetMeResponse>> => {
  const payload = {
    idProceso: 21,
  };
  const response = await axiosInstance.post<ApiResponse<GetMeResponse>>(
    "/Query/GetMe",
    payload,
  );

  return response.data;
};
