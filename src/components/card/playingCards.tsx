import React from "react";
import { Cards as CardsType } from "../../@types/Cards";
import { Cards } from "../../card";
import { v4 as uuid } from "uuid";

type PlayerCardProps = {
  card: CardsType[];
};
const PlayingCards: React.FC<PlayerCardProps> = ({ card }) => {
  return (
    <div className="relative w-[300px] h-[400px]">
      {card.slice(-5).map((c, index) => {
        const isTopCard = index === card.slice(-5).length - 1;
        return (
          <img
            key={uuid()}
            src={`/cards/${Cards[c.name]}`}
            className={`absolute w-[300px] h-[400px]`}
            style={{
              top: `${index * 5}px`,
              left: `${index * 5}px`,
              zIndex: index + 1,
              filter: isTopCard ? "none" : "brightness(0.8)",
              transform: isTopCard ? "translateY(-5px)" : "none",
            }}
          />
        );
      })}
    </div>
  );
};

export default PlayingCards;
