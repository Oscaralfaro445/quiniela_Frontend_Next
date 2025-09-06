import axiosInstance from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext/AuthContext";
import { useAlert } from "@/context/alertContext/AlertContext";
import { RegisterFormValues } from "@/types/register/register";
import { AlertState } from "@/types/alert/alert";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

const postUser = async (
  token: string,
  payload: {
    idProceso: number;
    data: {
      CVE_USUARIO: string;
      APELLIDO_PATERNO: string;
      APELLIDO_MATERNO: string;
      NOMBRE: string;
      PASSWORD: string;
      B_BLOQUEADO: boolean;
      SIT_USUARIO: string;
      CVE_IDIOMA: string;
      CVE_PERFIL: string;
    };
  }
) => {
  const response = await axiosInstance.post("/Login/Usuario", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const usePostUser = () => {
  const { token } = useAuth();
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["postUser"],
    mutationFn: (registerData: RegisterFormValues) =>
      postUser(token!, {
        idProceso: 1,
        data: {
          CVE_USUARIO: registerData.cveUsuario,
          APELLIDO_PATERNO: registerData.apellidoPaterno,
          APELLIDO_MATERNO: registerData.apellidoMaterno,
          NOMBRE: registerData.nombre,
          PASSWORD: registerData.password,
          B_BLOQUEADO: true,
          SIT_USUARIO: "A",
          CVE_IDIOMA: "ES",
          CVE_PERFIL: "TEMPORAL",
        },
      }),
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error al procesar la solicitud",
        "Tuvimos un problema al registrar al usuario"
      );
    },
    onSuccess: (data) => {
      handleRequestStatus({
        estatus: data.estatus,
        errorUs: data.errorUs,
        errorNeg: data.errorNeg,
        mensajeExito: "Registro exitoso",
      });
    },
    onSettled: () => {},
  });
};
