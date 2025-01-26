export interface Cards {
  id: string;
  name: string;
}

export interface Opponents {
  [player: string]: Cards[];
}

export type Direction = "clockwise" | "anticlockwise";
export type Color = "red" | "blue" | "green" | "yellow";