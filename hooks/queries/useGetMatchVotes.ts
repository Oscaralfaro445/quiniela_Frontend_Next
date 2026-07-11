import { useQuery } from "@tanstack/react-query";
import { useGetMe } from "./user/useGetMe";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { getMatchesVotes } from "@/services/getMatchVotes.service";

export const useGetMatchVotes = () => {
  const { data: user } = useGetMe();
  const userInfo = user?.data?.[0];

  return useQuery<ApiResponse<GetMatchVotesResponse>, ApiError>({
    queryKey: ["matchVotes"],
    queryFn: () => getMatchesVotes(userInfo!.idQuiniela, userInfo!.idPeriodo),
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
