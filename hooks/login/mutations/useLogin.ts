import { useRouter } from "next/navigation";
import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";
import { LoginFormValues, LoginProps } from "@/types/login/login";
import { AxiosError } from "axios";

interface ErrorResponse {
  estatus: number;
  errorUs?: string | null;
  errorNeg?: string[] | null;
}

export interface CodeVerificationRow {
  bExisteQuin: boolean;
  idQuiniela: number;
}

export interface CodeVerificationResponse {
  data: CodeVerificationRow[];
  errorNeg: string[] | null;
  errorUs: string | null;
  estatus: number;
}

const login = async (payload: LoginProps) => {
  const response = await axiosInstance.post("/Login/Autentica", payload);
  return response.data;
};

export const useLogin = () => {
  const { handleRequestStatus } = useHandleRequestStatus();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    CodeVerificationResponse,
    AxiosError<ErrorResponse>,
    LoginFormValues
  >({
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
        queryClient.invalidateQueries();
        router.push("/dashboard");
      }
    },
    onSettled: (data, error) => {
      const requestData = data || error?.response?.data;
      handleRequestStatus({
        estatus: requestData?.estatus,
        errorUs: requestData?.errorUs ?? "",
        errorNeg: requestData?.errorNeg ?? [],
        error: error?.message ?? "",
        mensajeExito: "Login exitoso",
      });
    },
  });
};
