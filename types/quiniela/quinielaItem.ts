export interface QuinielaItem {
  Partido: number;
  IdV: number;
  EquipoV: string;
  IdL: number;
  EquipoL: string;
  Fecha: string;
  ID_SCORE_E1: number;
  ID_SCORE_E2: number;
  HoraPartido: string;
  Estadio: string;
  partGanador: string;
  scoreVist: number;
  scoreLocal: number;
  bMarcador: boolean;
  numGanadosV: number;
  numPerdidosV: number;
  numEmpatadosV: number;
  numGanadosL: number;
  numPerdidosL: number;
  numEmpatadosL: number;
  votosVisitante: number;
  votosLocal: number;
  pjeVisitante: number;
  pjeLocal: number;
  survEquipoV: string;
  survEquipoL: string;
}
