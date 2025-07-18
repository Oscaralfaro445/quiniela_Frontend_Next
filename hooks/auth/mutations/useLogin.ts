import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "../../axios/axiosInstance";

const ID_PROCESO = 123;
const CVE_APLICACION = "NFL";

const postData = async (payload: {
  cveUsuario: string;
  password: string;
  idProceso: number;
  cveAplicacion: string;
}) => {
  const response = await axiosInstance.post("/Login/Autentica", payload);
  return response.data;
};

export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (loginData: { cveUsuario: string; password: string }) =>
      postData({
        cveUsuario: loginData.cveUsuario,
        password: loginData.password,
        idProceso: ID_PROCESO,
        cveAplicacion: CVE_APLICACION,
      }),
    onSuccess: (data) => {
      // console.log("Respuesta completa del servidor:", data);
      // console.log("Propiedades de data:", Object.keys(data));
      // console.log("Token de la respuesta:", data.data[0].token);

      if (data.data[0].token) {
        // Usar el contexto para manejar el login
        login(data.data[0]);
        router.push("/dashboard");
      } else {
        console.log("No se recibió token en la respuesta", data);
      }
    },
    onError: (error) => {
      console.log("Error en la peticion", error);
    },
  });
};
