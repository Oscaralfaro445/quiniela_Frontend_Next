import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { TokenVerificationVariables } from "@/types/changePassword/changePassword";
import { tokenVerification } from "@/services/user/tokenVerification.service";

export const useTokenVerification = (variables: TokenVerificationVariables) => {
  return useQuery<ApiResponse<{ usuario: string }>, ApiError>({
    queryKey: ["tokenVerification", variables.token],
    queryFn: () => tokenVerification(variables),
  });
};
