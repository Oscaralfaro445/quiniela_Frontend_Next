import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useQuery } from "@tanstack/react-query";

export const getProfile = async (): Promise<
  ApiResponse<{
    APELLIDO_PATERNO: string;
    APELLIDO_MATERNO: string;
    NOMBRE: string;
  }>
> => {
  const payload = {
    idProceso: 25,
    idQuery: 24,
    parmRemp: {
      $1: "eavila@quiniela.com",
    },
  };

  const response = await axiosInstance.post<
    ApiResponse<{
      APELLIDO_PATERNO: string;
      APELLIDO_MATERNO: string;
      NOMBRE: string;
    }>
  >("/Query/Consulta", payload);

  return response.data;
};

export const useGetProfile = () => {
  return useQuery<
    ApiResponse<{
      APELLIDO_PATERNO: string;
      APELLIDO_MATERNO: string;
      NOMBRE: string;
    }>,
    ApiError
  >({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });
};
