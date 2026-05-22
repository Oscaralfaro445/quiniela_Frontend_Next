import { axiosInstance } from "@/api/axiosInstance";
import { GetMatchVotesResponse } from "@/hooks/queries/useGetMatchVotes";
import { ApiResponse } from "@/types/api/ApiResponse";

export const getMatchesVotes = async (
  idQuiniela: number,
  idPeriodo: string,
): Promise<ApiResponse<GetMatchVotesResponse>> => {
  console.log(
    "Fetching match votes with idQuiniela:",
    idQuiniela,
    "and idPeriodo:",
    idPeriodo,
  );
  const payload = {
    idProceso: 29,
    idQuery: 19,
    parmRemp: {
      $1: idQuiniela,
      $2: idPeriodo,
    },
  };

  const response = await axiosInstance.post<ApiResponse<GetMatchVotesResponse>>(
    "/Query/Consulta",
    payload,
  );

  return response.data;
};
