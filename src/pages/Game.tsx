import React from "react";
import { SwitchButton } from "../components/button/UnoButton";

const Game: React.FC = () => {
  const handleUnoClick = () => {};
  return (
    <div className="relative min-h-screen gameBg">
      {/* Opponents */}
      <div className="absolute top-0 left-0 flex justify-between w-full px-10 py-10">
        {/* Player 1 */}
        <div className="flex max-w-[700px] space-x-[-1.2rem] flex-wrap">
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
        </div>
        {/* Player 2 */}
        <div className="flex max-w-[700px] space-x-[-1.2rem] flex-wrap">
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
        </div>
        {/* Player 3 */}
        <div className="flex max-w-[700px] space-x-[-1.2rem] flex-wrap">
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
          <img
            src="/cards/Deck.png"
            className="max-w-[100px] max-h-[150px] w-full h-full "
          />
        </div>
      </div>

      {/* Played and Draw Cards */}
      <div className="absolute top-[45%] left-[50%] flex gap-8">
        {/* Stack of cards */}
        <div className="w-[350px]  h-[350px] right-0 translate-x-[-80%] translate-y-[-50%] relative">
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
        {/* Playing card */}
        <div className="w-[350px]  h-[350px] right-0 translate-x-[-70%] translate-y-[-50%]">
          <img src="/cards/Red_2.png" className="w-[300px]" />
        </div>
      </div>

      {/* User cards */}
      <div className="absolute bottom-0 left-0 flex items-center justify-center w-full py-10">
        <div className="flex space-x-[-1.8rem]">
          <img src="/cards/Blue_1.png" className="w-[150px]" />
          <img src="/cards/Yellow_5.png" className="w-[150px]" />
          <img src="/cards/Blue_6.png" className="w-[150px]" />
          <img src="/cards/Wild.png" className="w-[150px]" />
          <img src="/cards/Green_2.png" className="w-[150px]" />
          <img src="/cards/Red_Skip.png" className="w-[150px]" />
          <img src="/cards/Red_2.png" className="w-[150px]" />
        </div>
      </div>

      {/* Uno button */}
      <div className="absolute bottom-0 right-0 w-[150px] h-[150px] rounded-full mb-10 mx-20 flex justify-center p-3  items-center ">
        <SwitchButton switchMode={handleUnoClick}></SwitchButton>
      </div>
    </div>
  );
};

export default Game;
