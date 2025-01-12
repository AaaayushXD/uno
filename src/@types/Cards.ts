export interface Cards {
  id: string;
  name: string;
}

export interface Opponents {
  [player: string]: Cards[];
}
