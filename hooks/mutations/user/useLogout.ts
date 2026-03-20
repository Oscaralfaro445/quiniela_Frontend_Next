import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/services/user/logout.service";
import { ApiResponse } from "@/types/api/ApiResponse";
import { ApiError } from "@/types/api/ApiError";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation<ApiResponse<null>, ApiError>({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: (data) => {
      if (data?.estatus === 1) {
        queryClient.removeQueries();
        router.push("/");
      }
    },
    onSettled: (data, error) => {
      const requestData = data || error?.response?.data;
      handleRequestStatus({
        estatus: requestData?.estatus,
        errorUs: requestData?.errorUs ?? "",
        errorNeg: requestData?.errorNeg ?? [],
        error: error?.message ?? "",
        mensajeExito: "Sesión cerrada correctamente",
      });
    },
  });
};
