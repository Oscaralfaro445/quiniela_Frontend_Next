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

const getDataGrid = async (): Promise<ApiResponse<any>> => {
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
    parmRemp: { $1: ">20", $99: "IN_PRUEBA" },
    /*  campos: [
      "NUM_CLIENTE as idEmpleado",
      "NOMBRE_CLIENTE as nombreCliente",
      "TIPO_CLIENTE as tipoCliente",
      "IMP_SUELDO as impSueldo",
    ], */
    where: ["NUM_CLIENTE"],
    orderBy: ["NUM_CLIENTE", "NOMBRE_CLIENTE"],
    numReg: 30,
    skip: 70,
  };

  const response = await axiosInstance.post<ApiResponse<any>>(
    "/Query/Consulta",
    payload,
  );

  return response.data;
};

export const useGetDataGrid = () => {
  return useQuery<ApiResponse<any>, ApiError>({
    queryKey: ["getDataGrid"],
    queryFn: getDataGrid,
  });
};
