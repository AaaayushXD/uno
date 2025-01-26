import React, { useState } from "react";
import { SwitchButton } from "../components/button/UnoButton";
import { UserCard } from "../components/card/UserCard";
import Containers from "../components/containers/containers";
import { DeckCards } from "../components/card/deckCard";
import PlayingCards from "../components/card/playingCards";
import Uno from "../components/modal/Uno";
import { OpponentCard } from "../components/card/OpponentCard";
import { gameState } from "../@types/Game";
import { v4 as uuid } from "uuid";

type GameProps = {
  gameState: gameState;
  handleUnoClick: VoidFunction;
};

const Game: React.FC<GameProps> = ({ gameState, handleUnoClick }) => {
  const { players, drawStack, playingCard, currentPlayer } = gameState;
  const userDeck = players[currentPlayer] || [];
  const [openUno, setOpenUno] = useState<boolean>(false);

  const isUnoClicked = () => {
    setOpenUno(true);
    handleUnoClick();
    setOpenUno(false);
  };
  const userCardAnimate = {
    transition: { duration: 0.5 },
    y: -25,
  };

  return (
    <div
      className="relative h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${"/cards/Table_0.png"})`,
        backgroundSize: "cover",
      }}
    >
      {/* Opponents */}
      <Containers
        container="opponents"
        className="absolute top-0 left-0 flex justify-between w-full px-10 py-10 "
      >
        {Object.entries(players)
          .filter(([player]) => parseInt(player) !== currentPlayer)
          .map(([player, deck]) => (
            <div key={player}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="text-xl text-white ">Player No: {player}</p>
                <p className="text-white">Cards: {deck.length}</p>
              </div>
              <OpponentCard cards={deck} />
            </div>
          ))}
      </Containers>
      {/* Played and Draw Cards */}
      <div className="absolute flex left-[30%] top-36">
        {/* Stack of cards */}
        <Containers
          container="drawDeck"
          className="max-w-[350px] h-[400px relative flex justify-center items-center mr-10"
        >
          <DeckCards cards={drawStack} />
        </Containers>
        {/* Playing card */}
        <Containers
          container="playingDeck"
          className="max-w-[350px] h-[400px] relative justify-center items-center flex  ml-10"
        >
          <PlayingCards card={[playingCard]} />
        </Containers>
      </div>
      {/* User cards */}
      <Containers
        key={uuid()}
        container="user"
        className="absolute bottom-0 left-0 flex items-center justify-center w-full py-10  space-x-[-1.8rem]"
      >
        {userDeck.map((card) => (
          <UserCard card={card} whileHover={userCardAnimate} key={uuid()} />
        ))}
        <div className="absolute top-0 flex items-center justify-between gap-2 mb-2">
          <p className="text-xl text-white ">
            Player No: {gameState.currentPlayer}
          </p>
          <p className="text-white">Cards: {userDeck.length}</p>
        </div>
      </Containers>

      {/* Uno button */}
      <div className="absolute bottom-0 right-0 w-[150px] h-[150px] rounded-full mb-10 mx-20 flex justify-center p-3  items-center">
        <SwitchButton switchMode={isUnoClicked}></SwitchButton>
      </div>
      {openUno && <Uno />}
    </div>
  );
};

export default Game;
