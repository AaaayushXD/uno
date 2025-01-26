import { useEffect, useRef, useState } from "react";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import Game from "./Game";
import { Container } from "../@types/Container";
import { Cards as CardType, Color, Direction } from "../@types/Cards";
import { suffleDeck } from "../utils/suffleDeck";
import { isValidMove } from "../helper/checkValidMove";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { toastConfig } from "../utils/toastConfig";
import { drawCards } from "../helper/drawCards";
import { getCardInfo } from "../utils/getCardInfo";
import WildCardModal from "../components/modal/WildCard.modal";
import { handleDirection } from "../helper/handleDirection";
import { handleTurn } from "../helper/handleTurn";
import Success from "./Success";
import { useNavigate } from "react-router-dom";

// type CurrentStackType = "draw2" | "draw4" | null;
interface GameState {
  players: { [key: number]: CardType[] };
  playingCard: CardType;
  drawStack: CardType[];
  currentColor: Color | null;
  currentAction: string | null;
  direction: Direction;
  gameOver: boolean;
  currentPlayer: number;
  totalPlayers: number;
}

export function Main() {
  //states
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [drawStack, setDrawStack] = useState<number>(0);
  // const [currentStack, setCurrentStack] = useState<CurrentStackType>(null);

  //Game state management
  const [gameState, setGameState] = useState<GameState>({
    players: {},
    playingCard: {} as CardType,
    drawStack: [],
    currentColor: null,
    currentAction: null,
    direction: "clockwise",
    gameOver: false,
    currentPlayer: 1,
    totalPlayers: 3,
  });

  // Game flow management
  const handleStartClick = async (noOfPlayer: number = 3) => {
    const {
      drawStack,
      players,
      playingCard,
      action,
      color,
      direction: currentDirection,
      isOpenModel,
    } = suffleDeck(noOfPlayer);

    setIsModalOpen(isOpenModel);
    setGameState((prevState) => ({
      ...prevState,
      players,
      playingCard,
      drawStack,
      currentColor: color,
      currentAction: action,
      direction: currentDirection,
      totalPlayers: noOfPlayer,
      currentPlayer: 1, // FIXED: Always start from player 1
    }));
  };

  useEffect(() => {
    handleStartClick(3);
  }, []);

  const isPlayerTurn = (playerId: number) =>
    gameState.currentPlayer === playerId;

  const giveCardsToPlayer = (playerId: number, cardsToDraw: number) => {
    if (gameState.drawStack.length < cardsToDraw) {
      toast.error("Not enough cards in the draw stack to distribute.");
      return;
    }
    const drawnCards = gameState.drawStack.slice(0, cardsToDraw);
    const updatedDrawStack = gameState.drawStack.slice(cardsToDraw);

    setGameState((prevState) => ({
      ...prevState,
      players: {
        ...prevState.players,
        [playerId]: [...prevState.players[playerId], ...drawnCards],
      },
      drawStack: updatedDrawStack,
    }));

    playDroppedCardSound();
    // Notify about the card draw
    toast.success(`Player ${playerId} drew ${cardsToDraw} cards.`);
  };

  // const handleDrawStack = (card: CardType) => {
  //   const { action } = getCardInfo(card.name);

  //   if (card.name === "W_D") {
  //     setCurrentStack("draw4");
  //     setDrawStack(4);
  //     return;
  //   }

  //   if (action === "D") {
  //     if (currentStack === "draw2") {
  //       setDrawStack((prev) => prev + 2);
  //     } else if (currentStack === "draw4") {
  //       setDrawStack(4);
  //     } else {
  //       setCurrentStack("draw2");
  //       setDrawStack(2);
  //     }
  //   }
  // };

  const drawCardsForPlayer = (playerId: number, noOfCards: number) => {
    giveCardsToPlayer(playerId, noOfCards);

    // Move to next player's turn
    const nextPlayer = handleTurn(
      gameState.totalPlayers,
      gameState.direction,
      gameState.currentPlayer,
      1
    );
    setGameState((prevState) => ({
      ...prevState,
      currentPlayer: nextPlayer,
    }));
  };

  //card draw sound
  const droppedCardSound = useRef(new Audio("/sound/throw_card.mp3"));
  const playDroppedCardSound = () => {
    droppedCardSound.current.play();
  };

  const handleDrawFromDeck = () => {
    const { drawnCards, remainingDeck } = drawCards(1, gameState.drawStack);
    playDroppedCardSound();
    setGameState((prevState) => ({
      ...prevState,
      players: {
        ...prevState.players,
        [gameState.currentPlayer]: [
          ...prevState.players[gameState.currentPlayer],
          ...drawnCards,
        ],
      },
      drawStack: remainingDeck,
    }));
    // setUserDeck((prev) => [...prev, ...drawnCards]);
    // setDrawDeck(remainingDeck);
    const nextPlayer = handleTurn(
      gameState.totalPlayers,
      gameState.direction,
      gameState.currentPlayer
    );
    setGameState((prevState) => ({
      ...prevState,
      currentPlayer: nextPlayer,
    }));
  };

  const handleCardDrop = (draggedCard: CardType) => {
    if (!isPlayerTurn(gameState.currentPlayer)) {
      toast.error("It's not your turn.");
      return;
    }

    const { color, action } = getCardInfo(draggedCard.name);

    // Wild card handling
    if (draggedCard.name === "Wild" || draggedCard.name === "W_D") {
      setIsModalOpen(true);
    }
    let nextPlayer = handleTurn(
      gameState.totalPlayers,
      gameState.direction,
      gameState.currentPlayer,
      1
    );

    console.log("actionnnnnn:::::::", action);
    if (draggedCard.name === "W_D") {
      drawCardsForPlayer(nextPlayer, 4);
    }

    // Draw stack handling
    if (action === "D") {
      drawCardsForPlayer(nextPlayer, 2);
    }

    // CHANGED: Improved skip and reverse logic
    switch (action) {
      case "S": // Skip
        toast.info(`Player ${gameState.currentPlayer} skipped next player!`);
        nextPlayer = handleTurn(
          gameState.totalPlayers,
          gameState.direction,
          gameState.currentPlayer,
          2
        ); // Skip next player
        setGameState((prevState) => ({
          ...prevState,
          currentPlayer: nextPlayer,
        }));
        break;
      case "R": {
        // Reverse
        toast.info("Direction reversed!");
        const newDirection = handleDirection(draggedCard, gameState.direction);
        toast.info("New direction::::::" + newDirection);
        nextPlayer = handleTurn(
          gameState.totalPlayers,
          (gameState.direction = newDirection),
          gameState.currentPlayer,
          1
        );
        setGameState((prevState) => ({
          ...prevState,
          currentPlayer: nextPlayer,
          direction: newDirection,
        }));
        break;
      }
      default:
        nextPlayer = handleTurn(
          gameState.totalPlayers,
          gameState.direction,
          gameState.currentPlayer,
          1
        );
        setGameState((prevState) => ({
          ...prevState,
          currentPlayer: nextPlayer,
        }));
    }

    // Update game state
    const currentPlayerDeck = (prev: CardType[]) =>
      prev.filter((card) => card.id !== draggedCard.id);

    setGameState((prevState) => ({
      ...prevState,
      playingCard: draggedCard,
      currentColor: color,
      currentAction: action,
      players: {
        ...prevState.players,
        [gameState.currentPlayer]: currentPlayerDeck(
          prevState.players[gameState.currentPlayer]
        ),
      },
    }));
    if (gameState.players[gameState.currentPlayer].length === 1) {
      handleGameOver();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedCardId = active.id as string;
    const sourceContainer = active.data.current?.container as Container;
    const destinationContainer = over.id as Container;

    if (sourceContainer === "drawDeck" && destinationContainer === "user") {
      //draw deck
      handleDrawFromDeck();
    } else if (
      sourceContainer === "user" &&
      destinationContainer === "playingDeck"
    ) {
      const draggedCard = gameState.players[gameState.currentPlayer].find(
        (card) => card.id === draggedCardId
      );
      if (
        !draggedCard ||
        !isValidMove(
          draggedCard,
          gameState.currentColor!,
          gameState.currentAction
        ) ||
        !isPlayerTurn(gameState.currentPlayer)
      ) {
        toast.error("Invalid Move.", { ...toastConfig });
        return;
      }

      playDroppedCardSound();
      handleCardDrop(draggedCard);
    }
  };

  const handleSelectColor = (color: Color) => {
    setGameState((prevState) => ({
      ...prevState,
      currentColor: color,
    }));
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handleUnoClick = () => {
    const playerCards = gameState.players[gameState.currentPlayer];

    // If player has more than 2 cards, draw 2 as penalty
    if (playerCards.length > 2) {
      giveCardsToPlayer(gameState.currentPlayer, 2);
      toast.warning(
        `Player ${gameState.currentPlayer} pressed UNO incorrectly and draws 2 cards!`
      );
      return;
    }

    // If player has exactly 2 cards, they're safe
    if (playerCards.length === 2) {
      toast.success(`Player ${gameState.currentPlayer} said UNO successfully!`);
      return;
    }
  };

  const handleGameOver = () => {
    setGameState((prevState) => ({
      ...prevState,
      gameOver: true,
    }));
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
        {gameState.gameOver ? (
          <>
            <Success
              winner={`Player ${handleTurn(
                gameState.totalPlayers,
                gameState.direction,
                gameState.currentPlayer,
                1
              )}`}
              onRestart={() => {
                navigate("/game");
              }}
            />
          </>
        ) : (
          <>
            <Game
              gameState={{
                currentPlayer: gameState.currentPlayer,
                players: gameState.players,
                drawStack: gameState.drawStack,
                playingCard: gameState.playingCard,
                direction: gameState.direction,
              }}
              handleUnoClick={handleUnoClick}
            />
          </>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        {isModalOpen && <WildCardModal onSelectColor={handleSelectColor} />}
      </DndContext>
    </>
  );
}
