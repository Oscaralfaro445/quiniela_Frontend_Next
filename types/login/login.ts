export interface LoginFormValues {
  cveUsuario: string;
  password: string;
}

export interface PostLoginData extends LoginFormValues {
  idProceso: number;
  cveAplicacion: string;
}
