import React, { useState } from "react";
import { SwitchButton } from "../components/button/UnoButton";
import { UserCard } from "../components/card/UserCard";
import Containers from "../components/containers/containers";
import { Cards as CardType, Direction } from "../@types/Cards";
import { DeckCards } from "../components/card/deckCard";
import PlayingCards from "../components/card/playingCards";
import Uno from "../components/modal/Uno";
import { drawCards } from "../helper/drawCards";
import { OpponentCard } from "../components/card/OpponentCard";

type GameProps = {
  gameState: {
    currentPlayer: number;
    players: { [key: number]: CardType[] };
    drawStack: CardType[];
    playingCard: CardType;
    direction: Direction;
  };
};

const Game: React.FC<GameProps> = ({ gameState }) => {
  const { players, drawStack, playingCard, currentPlayer } = gameState;
  const userDeck = players[currentPlayer] || [];
  const [openUno, setOpenUno] = useState<boolean>(false);
  const handleUnoClick = () => {
    setOpenUno(true);

    setTimeout(() => {
      if (userDeck.length === 2) {
        setTimeout(() => {
          if (!openUno) {
            // Add 4 cards to the user's deck
            drawCards(4, userDeck);
          }
        }, 3000);
      } else if (userDeck.length > 1) {
        // Add 2 cards to the user's deck
        drawCards(2, userDeck);
      }
      setOpenUno(false);
    }, 1000);
  };
  const userCardAnimate = {
    transition: { duration: 0.5 },
    y: -25,
  };

  return (
    <div
      className="relative h-screen overflow-hidden gameBg"
      // ref={boundaryRef}
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
        container="user"
        className="absolute bottom-0 left-0 flex items-center justify-center w-full py-10  space-x-[-1.8rem]"
      >
        {userDeck.map((card, index) => (
          <UserCard card={card} whileHover={userCardAnimate} key={index} />
        ))}
      </Containers>
      {/* Uno button */}
      <div className="absolute bottom-0 right-0 w-[150px] h-[150px] rounded-full mb-10 mx-20 flex justify-center p-3  items-center">
        <SwitchButton switchMode={handleUnoClick}></SwitchButton>
      </div>
      {openUno && <Uno />}
    </div>
  );
};

export default Game;
