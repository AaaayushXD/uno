import { Direction } from "../@types/Cards";

export const handleTurn = (
  totalPlayers: number,
  direction: Direction,
  currentPlayer: number,
  skipCount: number = 1
) => {
  const nextPlayer =
    direction === "clockwise"
      ? ((currentPlayer + skipCount - 1) % totalPlayers) + 1
      : ((currentPlayer - skipCount - 1 + totalPlayers) % totalPlayers) + 1;

  console.log("Current player: ", currentPlayer);
  console.log("Now playing: ", nextPlayer);
  console.log("Direction: ", direction);
  return nextPlayer;
};
