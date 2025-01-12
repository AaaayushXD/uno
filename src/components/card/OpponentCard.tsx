import React from "react";
import { Cards } from "../../@types/Cards";

type OpponentCardProps = {
  cards: Cards[];
};

export const OpponentCard: React.FC<OpponentCardProps> = ({ cards }) => {
  return (
    <div className="flex max-w-[700px] space-x-[-1.2rem] flex-wrap">
      {cards.map((_, index) => (
        <img
          key={index}
          src="/cards/Deck.png"
          className="max-w-[100px] max-h-[150px] w-full h-full "
        />
      ))}
    </div>
  );
};
