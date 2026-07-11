import { InputType } from "../input/input";

export interface GetInfoFormResponse {
  infoForma: InfoForm;
  infComponente: Component[];
}

export interface InfoForm {
  cveAplicacion: string;
  cve_forma: string;
  cveTituloForma: string;
  txTituloForma: string;
  descForma: string;
  cveTipoForma: string;
  cveTipoLayout: string;
  numColumnas: number;
  bGrid: boolean;
  fFiltra: boolean;
  bReporta: boolean;
  bCrea: boolean;
  bEdita: boolean;
  bBorra: boolean;
  cveCategoria: string;
  nomTablaDb: string;
}

export interface Component {
  nomComponente: string;
  cveTipoCampo: string;
  cveTipoCompon: InputType;
  bCampoBd: boolean;
  nomCampoBd: string;
  numOrden: number;
  numFila: null;
  numColumna: null;
  txEtiqueta: string;
  txAyuda: string;
  bCrea: boolean;
  bEdita: boolean;
  bRequerido: boolean;
  bGrid: boolean;
  bFiltra: boolean;
  bReporta: boolean;
  bDisable: boolean;
  bPk: boolean;
  pkSecuencia: number;
  cveTamanoCampo: string;
  fnMuestra: null;
  fnValida: null;
  msgValida: null;
  fnObtValor: null;
  infdetComp: string;
}
