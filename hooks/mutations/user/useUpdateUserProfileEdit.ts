import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { ProfileEditUpdateVariables } from "@/types/user/user.types";
import { updateUserProfileEdit } from "@/services/user/updateUserProfileEdit.service";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

export const useUpdateUserProfileEdit = () => {
  const { handleRequestStatus } = useHandleRequestStatus();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, ProfileEditUpdateVariables>({
    mutationKey: ["updateUserProfileEdit"],
    mutationFn: updateUserProfileEdit,
    onSuccess: (data) => {
      if (data.estatus === 1) {
        queryClient.invalidateQueries({
          queryKey: ["getUserProfileEdit"],
        });
      }
    },
    onSettled: (data, error) => {
      const requestData = data || error?.response?.data;
      handleRequestStatus({
        estatus: requestData?.estatus,
        errorUs: requestData?.errorUs ?? "",
        errorNeg: requestData?.errorNeg ?? [],
        error: error?.message ?? "",
        mensajeExito: "Perfil actualizado exitosamente",
      });
    },
  });
};
