import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { getMatchesVotes } from "@/services/getMatchVotes.service";

export const useGetMatchVotes = () => {
  return useQuery<ApiResponse<GetMatchVotesResponse>, ApiError>({
    queryKey: ["matchVotes"],
    queryFn: () => getMatchesVotes(),
  });
};

export interface GetMatchVotesResponse {
  idLocal: number;
  idPartido: number;
  idPeriodo: string;
  idVisitante: number;
  nomLocal: string;
  nomVisitante: string;
  pjeLocal: number;
  pjeVisitante: number;
  votosLocal: number;
  votosVisitante: number;
}
