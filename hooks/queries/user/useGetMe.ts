import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api/ApiResponse";
import { ApiError } from "@/types/api/ApiError";
import { GetMeResponse } from "@/types/user/user.types";
import { getMe } from "@/services/user/getMe.service";

export const useGetMe = () => {
  return useQuery<ApiResponse<GetMeResponse>, ApiError>({
    queryKey: ["getMe"],
    queryFn: getMe,
  });
};
