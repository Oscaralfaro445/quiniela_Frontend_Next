import { axiosInstance } from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const unlockUser = async (variables: { user: string; status: boolean }) => {
  const { user, status } = variables;

  const payload = {
    idProceso: 24,
    model: "FC_SEG_USUARIO",
    data: {
      CVE_USUARIO: user,
      B_BLOQUEADO: status ? 0 : 1, // Si el nuevo estado es activo (true), se envía 0; si es bloqueado (false), se envía 1
    },
  };

  const response = await axiosInstance.post("/Crud/Modifica", payload);

  return response.data;
};

export const useUnlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["unlockUser"],
    mutationFn: unlockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
  });
};
