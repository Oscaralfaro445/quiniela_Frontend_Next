import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/services/user/logout.service";
import { ApiResponse } from "@/types/api/ApiResponse";
import { ApiError } from "@/types/api/ApiError";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ApiResponse<null>, ApiError>({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: (data) => {
      if (data?.estatus === 1) {
        //queryClient.setQueryData(["getMe"], null);
        //queryClient.invalidateQueries({ queryKey: ["getMe"] });
        queryClient.removeQueries();
        router.push("/");
      }
    },
  });
};
