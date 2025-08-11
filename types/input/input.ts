export enum InputType {
  TEXTO = "TEXTO",
  AREA = "AREA",
  NUMERO = "NUMERO",
  FECHA = "FECHA",
  COMBO = "COMBO",
  SWITCH = "SWITCH",
  LOOKUP = "LOOKUP",
  TYPEAHEAD = "TYPEAHEAD",
  FILE = "FILE",
  RELATION = "RELATION",
  SECTION = "SECTION",
  SEPARADOR = "SEPARADOR",
}

export interface InputProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}
