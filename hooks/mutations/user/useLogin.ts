import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";
import { ApiResponse } from "@/types/api/ApiResponse";
import { ApiError } from "@/types/api/ApiError";
import { LoginVariables } from "@/types/user/user.types";
import { login } from "@/services/user/login.service";

export const useLogin = () => {
  const { handleRequestStatus } = useHandleRequestStatus();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ApiResponse<null>, ApiError, LoginVariables>({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      if (data.estatus === 1) {
        queryClient.invalidateQueries();
        router.push("/dashboard");
      }
    },
    onSettled: (data, error) => {
      const requestData = data || error?.response?.data;
      handleRequestStatus({
        estatus: requestData?.estatus,
        errorUs: requestData?.errorUs ?? "",
        errorNeg: requestData?.errorNeg ?? [],
        error: error?.message ?? "",
        mensajeExito: "Login exitoso",
      });
    },
  });
};
