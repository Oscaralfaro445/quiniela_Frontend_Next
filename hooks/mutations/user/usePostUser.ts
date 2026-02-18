import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api/ApiResponse";
import { PostUserVariables } from "@/types/register/register.types";
import { UserCreateResponse } from "@/types/user/user.types";
import { postUserService } from "@/services/user/postUser.service";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

export const usePostUser = () => {
  const { handleRequestStatus } = useHandleRequestStatus();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    ApiResponse<UserCreateResponse>,
    AxiosError<ApiResponse<null>>,
    PostUserVariables
  >({
    mutationKey: ["postUser"],
    mutationFn: postUserService,
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
