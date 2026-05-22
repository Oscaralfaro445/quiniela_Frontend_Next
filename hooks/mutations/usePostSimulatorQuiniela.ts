import { axiosInstance } from "@/api/axiosInstance";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const postQuinielaSimulator = async (payload: {
  idProceso: number;
  idProcedure: number;
  parmRemp: {
    $1: number;
    $2: string;
    $3: string;
  };
}) => {
  const response = await axiosInstance.post("/Query/Procedure", payload);
  return response.data;
};

export const usePostSimulatorQuiniela = () => {
  const { data } = useGetMe();
  const user = data?.data?.[0];
  const queryClient = useQueryClient();
  const { handleRequestStatus } = useHandleRequestStatus();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<ApiResponse<any>, ApiError, string>({
    mutationKey: ["quiniela-simulator"],
    mutationFn: (quinielaDataSimulated: string) =>
      postQuinielaSimulator({
        idProceso: 17,
        idProcedure: 8,
        parmRemp: {
          $1: user!.idQuiniela,
          $2: user!.idPeriodo,
          $3: quinielaDataSimulated,
        },
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      handleRequestStatus({
        estatus: data.estatus,
        errorUs: data.errorUs,
        errorNeg: data.errorNeg,
        mensajeExito: "Simulador de quiniela guardado correctamente",
      });
    },
    onSettled: (data, error) => {
      if (error) {
        const requestData = data || error?.response?.data;
        handleRequestStatus({
          estatus: requestData?.estatus,
          errorUs: requestData?.errorUs ?? "",
          errorNeg: requestData?.errorNeg ?? [],
          error: error?.message ?? "",
          mensajeExito: "",
        });
      }
    },
  });
};
