import { Direction } from "../@types/Cards";

export const handleTurn = (
  totalPlayers: number,
  direction: Direction,
  currentPlayer: number
) => {
  const nextPlayer =
    direction === "clockwise"
      ? (currentPlayer % totalPlayers) + 1
      : ((currentPlayer - 2 + totalPlayers) % totalPlayers) + 1;
  console.log("Current player: ", currentPlayer);
  console.log("Now playing: ", nextPlayer);
  console.log("Direction: ", direction);
  return nextPlayer;
};
