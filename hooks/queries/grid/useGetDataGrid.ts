import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { axiosInstance } from "@/api/axiosInstance";

export interface GetDataGridVariables {
  idProceso: number;
  idQuery: number;
  parmRemp?: Record<string, string | number>;
  campos?: string[];
  where?: string[];
  orderBy?: string[];
  numReg?: number;
  skip?: number;
}

const getDataGrid = async (): Promise<
  ApiResponse<Record<string, string | number>>
> => {
  /*  const payload = {
    idProces: 23,
    idQuery: 100,
    parRemp: { $1: ">20", $99: "IN_PRUEBA" },
    where: ["NUM_CLIIENTE"],
    orderBy: ["NUM_CLIENTE", "NOMBRE_CLIENTE"],
    numReg: 10,
    skip: 10,
  }; */

  const payload = {
    idProceso: 23,
    idQuery: 100,
    parmRemp: { $99: "IN_PRUEBA" },
    /*     campos: ["NUM_CLIENTE"],*/
    where: [],
    orderBy: ["NUM_CLIENTE", "NOMBRE_CLIENTE"],
    numReg: 30,
    skip: 70,
  };

  const response = await axiosInstance.post<
    ApiResponse<Record<string, string | number>>
  >("/Query/Consulta", payload);

  return response.data;
};

export const useGetDataGrid = () => {
  return useQuery<ApiResponse<Record<string, string | number>>, ApiError>({
    queryKey: ["getDataGrid"],
    queryFn: getDataGrid,
  });
};
