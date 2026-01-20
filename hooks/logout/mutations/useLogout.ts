import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const logout = async () => {
  const response = await axiosInstance.post("/Login/Logout");
  return response.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: (data) => {
      if (data.estatus === 1) {
        queryClient.invalidateQueries({ queryKey: ["getMe"] });
        window.location.href = "/";
      }
    },
  });
};
