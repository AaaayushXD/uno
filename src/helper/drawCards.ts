import { Cards } from "../@types/Cards";

export const drawCards = (noOfCards: number, deckOfCards: Cards[]) => {
  const drawnCards = deckOfCards.slice(0, noOfCards);
  return { drawnCards, remainingDeck: deckOfCards.slice(noOfCards) };
};
