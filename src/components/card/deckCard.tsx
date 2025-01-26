import React from "react";
import { Draggable } from "../draggable/draggable";
import { Cards as CardType } from "../../@types/Cards";

type DeckCardsProps = {
  cards: CardType[];
};
export const DeckCards: React.FC<DeckCardsProps> = ({ cards }) => {
  if (cards.length === 0) {
    return <div className="text-2xl text-white">No cards left!</div>;
  }
  return (
    <div className="relative w-[300px] h-[400px]">
      {cards.slice(0, 5).map((card, index) => {
        const isTopCard = cards[0];
        return (
          <Draggable
            id={card.id}
            data={{ container: "drawDeck" }}
            key={card.id}
          >
            <img
              src="/cards/Deck.png"
              className={`w-[300px] max-h-[400px] absolute z-10`}
              style={{
                top: `${index * 5}px`,
                left: `${index * 5}px`,
                zIndex: cards.length - index,
                filter: isTopCard ? "none" : "brightness(0.8)",
                transform: isTopCard ? "translateY(-5px)" : "none",
              }}
              alt="Deck card"
            />
          </Draggable>
        );
      })}
    </div>
  );
};
