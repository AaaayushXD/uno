import { Cards } from "../@types/Cards";
import { totalDeck } from "./totalDeck";
export const suffleDeck = (noOfPlayer: number) => {
  const { totalDeck: deck } = totalDeck();
  const shuffledDeck: Cards[] = deck.sort(() => Math.random() - 0.5);

  const usersDeck: Cards[] = [];
  const opponents: Record<string, Cards[]> = {};

  for (let i = 1; i < noOfPlayer; i++) {
    opponents[`player${i}`] = [];
  }

  let cardIndex: number = 0;
  while (cardIndex < noOfPlayer * 7) {
    const playerIndex = cardIndex % noOfPlayer;

    if (playerIndex === 0) {
      usersDeck.push(shuffledDeck.shift()!);
    } else {
      opponents[`player${playerIndex}`].push(shuffledDeck.shift()!);
    }
    cardIndex++;
  }

  const playingCard = shuffledDeck.shift()!;
  const drawStack = shuffledDeck;
  return { usersDeck, opponents, playingCard, drawStack };
};
