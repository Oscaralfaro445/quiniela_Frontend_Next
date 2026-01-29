export interface RecoveryFormValues {
  CVE_USUARIO: string;
}

export interface RecoveryProps {
  idProceso: number;
  model: string;
  data: RecoveryFormValues;
}
