import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

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
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation<ApiResponse<{ contador: number }>, ApiError, string>({
    mutationKey: ["sendEmail"],
    mutationFn: sendEmail,
    onSettled: (data, error) => {
      const requestData = data || error?.response?.data;
      handleRequestStatus({
        estatus: requestData?.estatus,
        errorUs: requestData?.errorUs ?? "",
        errorNeg: requestData?.errorNeg ?? [],
        error: error?.message ?? "",
        mensajeExito: "Correo enviado correctamente",
      });
    },
  });
};
