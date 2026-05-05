export enum InputType {
  TEXTO = "TEXTO",
  AREA = "AREA",
  NUMERO = "NUMERO",
  FECHA = "FECHA",
  COMBO = "COMBO",
  SWITCH = "SWITCH",
  SEPARADOR = "SEPARADOR",
}

export interface InputV2Props {
  id: string;
  name?: string;
  type?: InputType | string;
  data?: { llave: string; valor: string }[];
  value?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  error?: string | null;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}
