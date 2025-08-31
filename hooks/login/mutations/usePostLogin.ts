import axiosInstance from "../../axios/axiosInstance";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginFormValues } from "@/types/login/login";
import { AlertState } from "@/types/alert/alert";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

const postLogin = async (payload: {
  cveUsuario: string;
  password: string;
  idProceso: number;
  cveAplicacion: string;
}) => {
  const response = await axiosInstance.post("/Login/Autentica", payload);
  return response.data;
};

const usePostLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (loginData: LoginFormValues) => {
      const response = await postLogin({
        idProceso: 1,
        cveUsuario: loginData.cveUsuario,
        password: loginData.password,
        cveAplicacion: "NFL",
      });

      return { ...response, rememberMe: loginData.rememberMe };
    },
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error al procesar la solicitud",
        "Tuvimos un problema al iniciar sesión"
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["survivorStatus"] });
      handleRequestStatus({
        estatus: data.estatus,
        errorUs: data.errorUs,
        errorNeg: data.errorNeg,
        mensajeExito: "Inicio de sesión exitoso",
      });

      if (data.data[0].token) {
        router.push("/dashboard");
        login(data.data[0].token, data.data[0], data.rememberMe);
      } else {
        showAlert(
          AlertState.ERROR,
          "Error al procesar la respuesta",
          "No se recibió token en la respuesta"
        );
      }
    },
    onSettled: () => {},
  });
};

export default usePostLogin;
