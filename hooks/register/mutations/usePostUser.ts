import { axiosInstance } from "@/hooks/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAlert } from "@/context/alert/AlertContext";
import { RegisterFormValues } from "@/types/register/register";
import { AlertState } from "@/types/alert/alert";
import { useHandleRequestStatus } from "@/utils/showRequestStatus/showRequestStatus";

const postUser = async (payload: {
  idProceso: number;
  model: string;
  data: {
    CVE_USUARIO: string;
    APELLIDO_PATERNO: string;
    APELLIDO_MATERNO: string;
    NOMBRE: string;
    PASSWORD: string;
    B_BLOQUEADO: number;
    SIT_USUARIO: string;
    CVE_IDIOMA: string;
    CVE_PERFIL: string;
    IDENTIFICADOR: string;
  };
}) => {
  const response = await axiosInstance.post("/Crud/Crea", payload);
  return response.data;
};

export const usePostUser = () => {
  const { showAlert } = useAlert();
  const { handleRequestStatus } = useHandleRequestStatus();

  return useMutation({
    mutationKey: ["postUser"],
    mutationFn: ({
      registerData,
      identificador,
    }: {
      registerData: RegisterFormValues;
      identificador: string;
    }) =>
      postUser({
        idProceso: 1,
        model: "FC_SEG_USUARIO",
        data: {
          CVE_USUARIO: registerData.cveUsuario,
          APELLIDO_PATERNO: registerData.apellidoPaterno,
          APELLIDO_MATERNO: registerData.apellidoMaterno,
          NOMBRE: registerData.nombre,
          PASSWORD: registerData.password,
          B_BLOQUEADO: 1,
          SIT_USUARIO: "A",
          CVE_IDIOMA: "ES",
          CVE_PERFIL: "PARTICIPANTE",
          IDENTIFICADOR: identificador,
        },
      }),
    onError: () => {
      showAlert(
        AlertState.ERROR,
        "Error al procesar la solicitud",
        "Tuvimos un problema al registrar al usuario",
      );
    },
    onSuccess: (data) => {
      handleRequestStatus({
        estatus: data.estatus,
        errorUs: data.errorUs,
        errorNeg: data.errorNeg,
        mensajeExito: "Registro exitoso",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    },
    onSettled: () => {},
  });
};
