import { axiosInstance } from "@/api/axiosInstance";
import { GetMatchVotesResponse } from "@/hooks/queries/useGetMatchVotes";
import { ApiResponse } from "@/types/api/ApiResponse";

export const getMatchesVotes = async (): Promise<
  ApiResponse<GetMatchVotesResponse>
> => {
  const payload = {
    idProceso: 2,
    idQuery: 19,
    parmRemp: {
      $1: 1,
      $2: 13,
    },
  };

  const response = await axiosInstance.post<ApiResponse<GetMatchVotesResponse>>(
    "/Query/Consulta",
    payload,
  );

  return response.data;
};
