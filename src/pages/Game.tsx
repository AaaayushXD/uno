import React, { useEffect, useState } from "react";
import { SwitchButton } from "../components/button/UnoButton";
import { motion } from "motion/react";
import { UserCard } from "../components/card/UserCard";
import Containers from "../components/containers/containers";
import { Cards as CardType, Opponents } from "../@types/Cards";
import DeckCards from "../components/card/deckCard";
import PlayingCards from "../components/card/playingCards";
import { suffleDeck } from "../utils/suffleDeck";

const Game: React.FC = () => {
  const [userDeck, setUserDeck] = useState<CardType[]>([]);
  const [drawDeck, setDrawDeck] = useState<CardType[]>([]);
  const [opponents, setOpponents] = useState<Opponents>();
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [totalPlayers, setTotalPlayers] = useState<number>(1);
  const [playingCards, setPlayingCards] = useState<CardType[]>([]);

  const handleUnoClick = () => {};

  const handleStartClick = (noOfPlayer: number = 1) => {
    setTotalPlayers(noOfPlayer);
    const {
      drawStack,
      opponents: opponentsDeck,
      playingCard,
      usersDeck,
    } = suffleDeck(noOfPlayer);
    setUserDeck(usersDeck);
    setOpponents(opponentsDeck);
    setDrawDeck(drawStack);
    setPlayingCards([playingCard]);
  };

  const userCardAnimate = {
    transition: { duration: 0.5 },
    y: -25,
  };

  useEffect(() => {
    handleStartClick();
  }, []);

  return (
    <div className="relative min-h-screen gameBg">
      {/* Opponents */}
      <Containers container="opponents">
        <div className="absolute top-0 left-0 flex justify-between w-full px-10 py-10">
          {/* <OpponentCard />
          <OpponentCard />
          <OpponentCard /> */}
        </div>
      </Containers>

      {/* Played and Draw Cards */}
      <div className="absolute top-[45%] left-[50%] flex gap-8">
        {/* Stack of cards */}
        <Containers container={"drawDeck"}>
          <DeckCards />
        </Containers>
        {/* Playing card */}
        <Containers container={"playingDeck"}>
          <PlayingCards card={playingCards} />
        </Containers>
      </div>
      {/* User cards */}
      <Containers container={"user"}>
        <motion.div className="absolute bottom-0 left-0 flex items-center justify-center w-full py-10 border">
          <div className="flex space-x-[-1.8rem]">
            {userDeck.map((card, index) => (
              <UserCard card={card} whileHover={userCardAnimate} key={index} />
            ))}
          </div>
        </motion.div>
      </Containers>

      {/* Uno button */}
      <div className="absolute bottom-0 right-0 w-[150px] h-[150px] rounded-full mb-10 mx-20 flex justify-center p-3  items-center">
        <SwitchButton switchMode={handleUnoClick}></SwitchButton>
      </div>
    </div>
  );
};

export default Game;
