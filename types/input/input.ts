export enum InputType {
  /* SEPARADOR = "SEPARADOR" */
  TEXTO = "TEXTO",
  AREA = "AREA",
  NUMERO = "NUMERO",
  FECHA = "FECHA",
  COMBO = "COMBO",
  SWITCH = "SWITCH",
  //LOOKUP = "LOOKUP",
  //TYPEAHEAD = "TYPEAHEAD",
  //FILE = "FILE",
  //RELATION = "RELATION",
  //SECTION = "SECTION",
  //SEPARADOR = "SEPARADOR",
}

/* export interface InputProps {
  id?: string;
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  mutation?: { isError: boolean; isSuccess: boolean; isIdle: boolean };
} */

export interface InputV2Props {
  id?: string;
  name?: string;
  type?:
    | InputType
    | "area"
    | "combo"
    | "date"
    | "email"
    | "number"
    | "password"
    | "search"
    | "switch"
    | "text";
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
