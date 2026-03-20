import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api/ApiResponse";
import { ApiError } from "@/types/api/ApiError";
import { FavoriteTeamOption } from "@/types/user/user.types";
import { getAvailableTeams } from "@/services/user/getAvailableTeams.service";

export const useGetAvailableTeams = () => {
  return useQuery<ApiResponse<FavoriteTeamOption>, ApiError>({
    queryKey: ["availableTeams"],
    queryFn: getAvailableTeams,
  });
};
