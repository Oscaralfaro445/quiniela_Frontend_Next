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
  field?: any;
  type?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  name: string;
  id: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}
