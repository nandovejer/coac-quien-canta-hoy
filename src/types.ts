export type RankingKey = "top" | "ok" | "standar";

export interface Group {
  ranking?: RankingKey;
  modalidad: string;
  nombre: string;
  autor: string;
  ciudad?: string;
  id?: string;
  // Clave dinámica con el nombre de la agrupación el año anterior, p.ej. "2025".
  [previousYearKey: string]: string | undefined;
}

export interface SessionsData {
  [date: string]: Group[];
}
