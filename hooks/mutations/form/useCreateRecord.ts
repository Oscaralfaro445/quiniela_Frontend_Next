import { axiosInstance } from "@/api/axiosInstance";
import { ApiError } from "@/types/api/ApiError";
import { ApiResponse } from "@/types/api/ApiResponse";
import { FieldValue } from "@/utils/catalog/catalog";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createRecord = async (
  data: Record<string, FieldValue>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ApiResponse<any>> => {
  const payload = {
    idProceso: 26,
    model: "IN_PRUEBA",
    data,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await axiosInstance.post<ApiResponse<any>>(
    "/CRUD/Crea",
    payload,
  );

  return response.data;
};

export const useCreateRecord = () => {
  const queryClient = useQueryClient();
  const { handleRequestStatus } = useHandleRequestStatus();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ApiResponse<any>,
    ApiError,
    Record<string, FieldValue>
  >({
    mutationKey: ["createRecord"],
    mutationFn: createRecord,
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
        mensajeExito: "Registro creado exitosamente",
      });
    },
  });
};
