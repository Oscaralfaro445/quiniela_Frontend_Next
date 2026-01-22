import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginFormValues, PostLoginData } from "@/types/login/login";
import { useRouter } from "next/navigation";

const login = async (payload: PostLoginData) => {
  const response = await axiosInstance.post("/Login/Autentica", payload);
  return response.data;
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (loginData: LoginFormValues) =>
      login({
        idProceso: 1,
        cveAplicacion: "NFL",
        cveUsuario: loginData.cveUsuario,
        password: loginData.password,
      }),
    onSuccess: (data) => {
      if (data.estatus === 1) {
        queryClient.invalidateQueries({ queryKey: ["getMe"] });
        router.push("/dashboard");
      }
    },
  });
};
