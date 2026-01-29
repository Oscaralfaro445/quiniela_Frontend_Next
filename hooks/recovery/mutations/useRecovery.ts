import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { RecoveryProps } from "@/types/recovery/recovery";
import { useMutation } from "@tanstack/react-query";

const recovery = async (payload: RecoveryProps) => {
  const response = await axiosInstance.post("/Crud/FindByKey", payload);
  return response.data;
};

export const useRecovery = () => {
  return useMutation({
    mutationKey: ["recovery"],
    mutationFn: (recoveryData: { cveUsuario: string }) =>
      recovery({
        idProceso: 1,
        model: "FC_SEG_USUARIO",
        data: {
          CVE_USUARIO: recoveryData.cveUsuario,
        },
      }),
  });
};
