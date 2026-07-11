type data = string | null;

export interface Response {
  data: data;
  errorNeg: string[] | null;
  errorUs: string | null;
  estatus: number;
}
