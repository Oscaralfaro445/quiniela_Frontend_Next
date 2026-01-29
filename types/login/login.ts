export interface LoginFormValues {
  cveUsuario: string;
  password: string;
}

export interface LoginProps extends LoginFormValues {
  idProceso: number;
  cveAplicacion: string;
}
