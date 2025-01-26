import { Cards, Direction } from "../@types/Cards";
import { getCardInfo } from "./getCardInfo";
import { totalDeck } from "./totalDeck";
export const suffleDeck = (noOfPlayer: number) => {
  if (noOfPlayer < 2 || noOfPlayer > 8) {
    throw new Error("Number of players must be between 2 and 8");
  }
  const { totalDeck: deck } = totalDeck();
  const shuffledDeck: Cards[] = deck.sort(() => Math.random() - 0.5);

  const players: { [key: number]: Cards[] } = {};

  for (let i = 1; i <= noOfPlayer; i++) {
    players[i] = [];
  }

  let cardIndex: number = 0;
  while (cardIndex < noOfPlayer * 7) {
    const playerIndex = cardIndex % noOfPlayer || noOfPlayer;
    players[playerIndex].push(shuffledDeck.shift()!);
    cardIndex++;
  }

  const playingCard = shuffledDeck.shift()!;
  const { color, action, isOpenModel } = getCardInfo(playingCard.name);

  const direction: Direction = action?.endsWith("R")
    ? "clockwise"
    : "anticlockwise";

  return {
    players,
    playingCard,
    drawStack: shuffledDeck,
    color,
    action,
    direction,
    isOpenModel,
  };
};
