import axiosInstance from "../../axios/axiosInstance";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";

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

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (loginData: {
      cveUsuario: string;
      password: string;
      rememberMe: boolean;
    }) => {
      const response = await postLogin({
        idProceso: 1,
        cveUsuario: loginData.cveUsuario,
        password: loginData.password,
        cveAplicacion: "NFL",
      });

      return { ...response, rememberMe: loginData.rememberMe };
    },
    onError: (error) => {
      console.log("Error en la peticion", error);
    },
    onSuccess: (data) => {
      // console.log("Respuesta completa del servidor:", data);
      // console.log("Propiedades de data:", Object.keys(data));
      // console.log("Token de la respuesta:", data.data[0].token);

      if (data.data[0].token) {
        // Usar el contexto para manejar el login
        login(data.data[0].token, data.data[0], data.rememberMe);
        router.push("/dashboard");
      } else {
        console.log("No se recibió token en la respuesta", data);
      }
    },
    onSettled: () => {},
  });
};

export default usePostLogin;
