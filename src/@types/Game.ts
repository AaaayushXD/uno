import { Cards, Direction } from "./Cards";

export interface gameState {
  currentPlayer: number;
  players: { [key: number]: Cards[] };
  drawStack: Cards[];
  playingCard: Cards;
  direction: Direction;
}
