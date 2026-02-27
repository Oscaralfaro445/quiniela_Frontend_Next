import { tokenVerification } from "@/services/user/tokenVerification.service";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { TokenVerificationVariables } from "@/types/changePassword/changePassword";
import { useQuery } from "@tanstack/react-query";

export const useTokenVerification = (variables: TokenVerificationVariables) => {
  return useQuery<ApiResponse<null>, ApiError>({
    queryKey: ["tokenVerification", variables.token],
    queryFn: () => tokenVerification(variables),
  });
};
