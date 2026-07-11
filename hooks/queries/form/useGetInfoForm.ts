import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { GetInfoFormResponse } from "@/types/form/infoForm";
import { axiosInstance } from "@/api/axiosInstance";

const getInfoForm = async (): Promise<ApiResponse<GetInfoFormResponse>> => {
  // const {} = variables;

  const payload = {
    idProceso: 23,
    idProcedure: 12,
    parmRemp: {
      $1: "NFL",
      $2: "fPrueba",
    },
  };

  const response = await axiosInstance.post<ApiResponse<GetInfoFormResponse>>(
    "/Query/Procedure",
    payload,
  );

  return response.data;
};

export const useGetInfoForm = () => {
  return useQuery<ApiResponse<GetInfoFormResponse>, ApiError>({
    queryKey: ["getInfoForm"],
    queryFn: getInfoForm,
  });
};
