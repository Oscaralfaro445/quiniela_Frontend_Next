import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";

const sendEmail = async (
  email: string,
): Promise<ApiResponse<{ contador: number }>> => {
  const response = await axiosInstance.get<ApiResponse<{ contador: number }>>(
    "/Email/SendEmail",
    {
      params: {
        email: email,
      },
    },
  );
  return response.data;
};

export const useSendEmail = () => {
  return useMutation<ApiResponse<{ contador: number }>, ApiError, string>({
    mutationKey: ["sendEmail"],
    mutationFn: sendEmail,
  });
};
