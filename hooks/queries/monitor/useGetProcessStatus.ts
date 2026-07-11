import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useQuery } from "@tanstack/react-query";
import { useGetMe } from "../user/useGetMe";

const getProcessStatus = async (
  idPeriodo: string,
): Promise<ApiResponse<ProcessStatusData>> => {
  const payload = {
    idProceso: 2,
    idProcedure: 14,
    parmRemp: { $1: idPeriodo },
  };

  const response = await axiosInstance.post<ApiResponse<ProcessStatusData>>(
    "/Query/Procedure",
    payload,
  );

  return response.data;
};

export const useGetProcessStatus = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];

  return useQuery<ApiResponse<ProcessStatusData>, ApiError>({
    queryKey: ["getProcessStatus", user?.idPeriodo ?? "unknown"],
    queryFn: () => getProcessStatus(user!.idPeriodo),
  });
};

interface CierreFlag {
  estatus: number;
  detalle?: QuinielaCierre[];
}

interface AperturaFlag {
  estatus: number;
  detalle?: QuinielaApertura[];
}

interface QuinielaCierre {
  idQuiniela: number;
  idParticipante: number;
  nomParticipante: string;
}

interface QuinielaApertura {
  idQuiniela: number;
  titQuiniela: string;
}

interface CierreData {
  bQuiniela: CierreFlag;
  bResultado: CierreFlag;
  bSurvivor: CierreFlag;
  bExiste: CierreFlag;
  bPago: CierreFlag;
}

interface AperturaData {
  bQuinTot: AperturaFlag;
  bQuinPer: AperturaFlag;
  bApertura: AperturaFlag;
  bCierre: AperturaFlag;
}

interface ErrorItem {
  msgError: string;
}

interface ProcesoDetalle {
  idProceso: number;
  nombreProceso: string;
  fOperacion: string;
  horaInicio: string;
  horaFinal: string;
  sitProceso: "CO" | "ER";
  listaErrores?: ErrorItem[];
}

interface MonitorItem {
  cveMonitor: string;
  descMonitor: string;
  ultimaFechaEjecucion: string;
  bCorrecto: boolean;
  detalle?: ProcesoDetalle[];
}

interface ProcessStatusData {
  idPeriodo: string;
  totalCierre: number;
  totalApertura: number;
  cierre: CierreData;
  apertura: AperturaData;
  monitores: MonitorItem[];
}
