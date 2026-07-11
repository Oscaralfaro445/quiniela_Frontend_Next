type ConferenceType = "AMERICANA" | "NACIONAL";
type DivisionType = "ESTE" | "OESTE" | "NORTE" | "SUR";

interface Team {
  nombre: string;
  ganados: number;
  perdidos: number;
  empatados: number;
}

export interface Division {
  DIVISION: DivisionType;
  equipos: Team[];
}

export interface Conference {
  CONFERENCIA: ConferenceType;
  divisiones: Division[];
}
