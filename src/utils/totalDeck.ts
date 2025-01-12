import { Cards as CardType } from "../@types/Cards";
import { Cards } from "../card";
import { v4 as uuid } from "uuid";

export const totalDeck = () => {
  const totalDeck: CardType[] = [];
  const wildCards: CardType[] = [];

  //contains all unique cards
  const uniqueCards = Object.keys(Cards);
  uniqueCards.map((card) => {
    if (card.startsWith("W")) {
      for (let i = 0; i < 4; i++) {
        wildCards.push({ id: `${uuid()}`, name: card });
      }
    } else {
      for (let i = 0; i < 2; i++) {
        totalDeck.push({ id: `${uuid()}`, name: card });
      }
    }
  });
  return { totalDeck: [...totalDeck, ...wildCards] };
};
