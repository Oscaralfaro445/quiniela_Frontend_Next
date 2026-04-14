import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { axiosInstance } from "@/api/axiosInstance";

const getInfoForm = async (): Promise<ApiResponse<GetInfoFormResponse>> => {
  // const {} = variables;

  const payload = {
    idProceso: 18,
    idQuery: 17,
    parmRemp: {
      $1: "NFL",
      $2: "fPrueba",
    },
  };

  const response = await axiosInstance.post<ApiResponse<GetInfoFormResponse>>(
    "/Query/Consulta",
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

interface GetInfoFormResponse {
  CVE_APLICACION: string;
  CVE_FORMA: string;
  CVE_TITULO_FORMA: string;
  TX_TITULO_FORMA: string;
  URL_API_FORMA: string;
  DESC_FORMA: string;
  CVE_TIPO_FORMA: string;
  CVE_TIPO_LAYOUT: string;
  NUM_COLUMNAS: number;
  B_GRID: boolean;
  B_FILTRA: boolean;
  B_REPORTA: boolean;
  B_CREA: boolean;
  B_EDITA: boolean;
  B_BORRA: boolean;
  CVE_CATEGORIA: string;
  NOM_TABLA_DB: string;
  FN_ACEPTA: string;
  componentes: Componente[];
}

export interface Componente {
  CVE_APLICACION: string;
  CVE_FORMA: string;
  NOM_COMPONENTE: string;
  CVE_TIPO_CAMPO: string;
  CVE_TIPO_COMPON: string;
  B_CAMPO_BD: boolean;
  NOM_CAMPO_DB: string;
  NUM_ORDEN: number;
  NUM_FILA: number;
  NUM_COLUMNA: number;
  CVE_ETIQUETA: string | null;
  TX_ETIQUETA: string;
  CVE_AYUDA: string | null;
  TX_AYUDA: string | null;
  B_CREA: boolean;
  B_EDITA: boolean;
  B_REQUERIDO: boolean;
  B_GRID: boolean;
  B_FILTRA: boolean;
  B_REPORTA: boolean;
  FN_VALIDA: string | null;
  FN_MUESTRA: string | null;
  FN_OBT_VALOR: string | null;
  CVE_TAMANO_CAMPO: string;
  infdetComp: string | null;
}
