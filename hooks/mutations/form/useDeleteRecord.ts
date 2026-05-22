import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { axiosInstance } from "@/api/axiosInstance";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

const deleteRecord = async (
  id: string | number | boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ApiResponse<any>> => {
  const payload = {
    idProceso: 26,
    model: "IN_PRUEBA",
    data: {
      NUM_CLIENTE: id,
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await axiosInstance.post<ApiResponse<any>>(
    "/CRUD/Borra",
    payload,
  );

  return response.data;
};

export const useDeleteRecord = () => {
  const { handleRequestStatus } = useHandleRequestStatus();
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<ApiResponse<any>, ApiError, string | number | boolean>({
    mutationKey: ["deleteRecord"],
    mutationFn: deleteRecord,
    onSuccess: (data) => {
      if (data.estatus === 1) {
        queryClient.invalidateQueries({ queryKey: ["getDataGrid"] });
      }
    },
    onSettled: (data, error) => {
      const requestData = data || error?.response?.data;
      handleRequestStatus({
        estatus: requestData?.estatus,
        errorUs: requestData?.errorUs ?? "",
        errorNeg: requestData?.errorNeg ?? [],
        error: error?.message ?? "",
        mensajeExito: "Registro eliminado exitosamente",
      });
    },
  });
};
