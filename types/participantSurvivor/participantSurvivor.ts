export interface ParticipantSurvivor {
  ID_PARTICIPANTE: number;
  NOM_PARTICIPANTE: string;
  NUM_SURVIVORS: number;
  NUM_ACIERTOS: number;
  IMP_INVERSION: number;
  [key: `NOM_EQ_${number}`]: string;
}
