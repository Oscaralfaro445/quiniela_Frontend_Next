import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { FieldValue } from "@/utils/catalog/catalog";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateRecord = async (
  data: Record<string, FieldValue>,
): Promise<ApiResponse<any>> => {
  const payload = {
    idProceso: 26,
    model: "IN_PRUEBA",
    data,
  };

  const response = await axiosInstance.post<ApiResponse<any>>(
    "/CRUD/Modifica",
    payload,
  );

  return response.data;
};

export const useUpdateRecord = () => {
  const queryClient = useQueryClient();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation<ApiResponse<any>, ApiError, Record<string, FieldValue>>({
    mutationKey: ["updateRecord"],
    mutationFn: updateRecord,
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
        mensajeExito: "Registro actualizado exitosamente",
      });
    },
  });
};
