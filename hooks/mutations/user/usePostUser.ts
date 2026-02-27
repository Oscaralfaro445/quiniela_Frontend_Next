import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api/ApiResponse";
import { ApiError } from "@/types/api/ApiError";
import { PostUserVariables, UserCreateResponse } from "@/types/user/user.types";
import { postUser } from "@/services/user/postUser.service";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

export const usePostUser = () => {
  const { handleRequestStatus } = useHandleRequestStatus();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    ApiResponse<UserCreateResponse>,
    ApiError,
    PostUserVariables
  >({
    mutationKey: ["postUser"],
    mutationFn: postUser,
    onSuccess: (data) => {
      if (data?.estatus === 1) {
        queryClient.invalidateQueries();
        router.push("/login");
      }
    },
    onSettled: (data, error) => {
      const response = data ?? error?.response?.data;

      handleRequestStatus({
        estatus: response?.estatus,
        errorUs: response?.errorUs ?? "",
        errorNeg: response?.errorNeg ?? [],
        error: error?.message ?? "",
        mensajeExito: "Usuario creado correctamente",
      });
    },
  });
};
