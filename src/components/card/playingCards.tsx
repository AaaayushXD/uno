import React from "react";
import { Cards as CardsType } from "../../@types/Cards";
import { Cards } from "../../card";

type PlayerCardProps = {
  card: CardsType[];
};
const PlayingCards: React.FC<PlayerCardProps> = ({ card }) => {
  console.log({ card });
  return (
    <div className="w-[350px]  h-[350px] right-0 translate-x-[-70%] translate-y-[-50%] border">
      <img
        src={`/cards/${Cards[card[card.length - 1]?.name]}`}
        className="w-[300px]"
      />
    </div>
  );
};

export default PlayingCards;
