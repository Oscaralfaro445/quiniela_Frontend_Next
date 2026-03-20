/*
 ** GetMeResponse
 ** Estructura de la respuesta del enpoint GetMe,
 ** contienda la información del usuario logueado.
 */
export interface GetMeResponse {
  bResSurv: boolean;
  bSurvivor: boolean;
  cveIdioma: string;
  cvePerfil: string;
  cveUsuario: string;
  fLimite: string;
  horaLimite: string;
  idParticipante: number;
  idPeriodo: string;
  idQuiniela: number;
  nombreCompleto: string;
  titQuiniela: string;
}

/*
 ** Variables para el login
 ** Contiene los campos necesarios para realizar el procesode autentificación.
 */
export interface LoginVariables extends Pick<GetMeResponse, "cveUsuario"> {
  password: string;
}

export interface UserCreateResponse {
  idQuiniela: number;
}

export interface RegisterFormValues {
  cveUsuario: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombre: string;
  password: string;
  passwordConfirm: string;
}

export interface PostUserVariables {
  registerData: RegisterFormValues;
  identificador?: number;
}

export interface CodeVerificationVariables {
  code: string;
}

export interface UserProfileEditResponse {
  APELLIDO_PATERNO: string;
  APELLIDO_MATERNO: string;
  NOMBRE: string;
}

export interface FavoriteTeamOption {
  llave: number;
  valor: string;
}

export interface ProfileEditUpdateVariables {
  idQuiniela: number;
  cveUsuario: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombre: string;
  idEquipoFav: number;
}
