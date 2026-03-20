import { axiosInstance } from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const unlockUser = async (variables: { user: string }) => {
  const { user } = variables;

  const payload = {
    idProceso: 24,
    model: "FC_SEG_USUARIO",
    data: {
      CVE_USUARIO: user,
      B_BLOQUEADO: 0,
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
