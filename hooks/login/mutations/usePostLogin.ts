import axiosInstance from "../../axios/axiosInstance";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "@/types/login/login";
import { AlertState } from "@/types/alert/alert";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";

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
  const { login } = useAuth();
  const { showAlert } = useAlert();

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
        "Error de autenticación",
        "Usuario o contraseña incorrectos"
      );
    },
    onSuccess: (data) => {
      showAlert(
        AlertState.SUCCESS,
        "Operación exitosa",
        "Inicio de sesión exitoso"
      );

      if (data.data[0].token) {
        router.push("/dashboard");
        login(data.data[0].token, data.data[0], data.rememberMe);
      } else {
        console.log("No se recibió token en la respuesta", data);
      }
    },
    onSettled: () => {},
  });
};

export default usePostLogin;
