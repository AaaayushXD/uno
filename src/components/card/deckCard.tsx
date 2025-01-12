import React from "react";
const DeckCards: React.FC = () => {
  return (
    <div className="w-[350px]  h-[350px] right-0 translate-x-[-80%] translate-y-[-50%] relative border">
      <img src="/cards/Deck.png" className="w-[300px]" />
      <img
        src="/cards/Deck.png"
        className="w-[300px] absolute top-0 rotate-[10deg]"
      />
      <img
        src="/cards/Deck.png"
        className="w-[300px] absolute top-0 rotate-[-10deg]"
      />
      <img src="/cards/Deck.png" className="w-[300px] absolute top-0" />
    </div>
  );
};

export default DeckCards;
