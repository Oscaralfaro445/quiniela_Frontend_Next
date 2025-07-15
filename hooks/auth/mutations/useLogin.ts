import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: (loginData: { cveUsuario: string; password: string }) =>
      postData({
        cveUsuario: loginData.cveUsuario,
        password: loginData.password,
        idProceso: ID_PROCESO,
        cveAplicacion: CVE_APLICACION,
      }),
    onSuccess: (data) => {
      console.log("Data", data);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log("Error en la peticion", error);
    },
  });
};
