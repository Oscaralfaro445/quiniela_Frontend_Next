import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api/ApiResponse";
import { ApiError } from "@/types/api/ApiError";
import { UserProfileEditResponse } from "@/types/user/user.types";
import { getUserProfileEdit } from "@/services/user/getUserProfileEdit.service";
import { useGetMe } from "@/hooks/queries/user/useGetMe";

export const useGetUserProfileEdit = () => {
  const { data: user } = useGetMe();
  const userInfo = user?.data?.[0];

  return useQuery<ApiResponse<UserProfileEditResponse>, ApiError>({
    queryKey: ["getUserProfileEdit", userInfo?.cveUsuario],
    queryFn: () => getUserProfileEdit(userInfo!.cveUsuario),
    enabled: !!userInfo?.cveUsuario,
  });
};