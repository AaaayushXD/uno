import { useEffect, useRef, useState } from "react";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import Game from "./pages/Game";
import { Container } from "./@types/Container";
import { Cards as CardType, Color, Direction } from "./@types/Cards";
import { suffleDeck } from "./utils/suffleDeck";
import { isValidMove } from "./helper/checkValidMove";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { toastConfig } from "./utils/toastConfig";
import { drawCards } from "./helper/drawCards";
import { getCardInfo } from "./utils/getCardInfo";
import WildCardModal from "./components/modal/WildCard.modal";
import { handleDirection } from "./helper/handleDirection";
import { handleTurn } from "./helper/handleTurn";

type CurrentStackType = "draw2" | "draw4" | null;
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

function App() {
  //states
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  // initial state of the game
  const handleStartClick = async (noOfPlayer: number = 2) => {
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
      currentPlayer: 1,
    }));
  };
  useEffect(() => {
    handleStartClick(3);
  }, []);

  const [drawStack, setDrawStack] = useState<number>(0);
  const [currentStack, setCurrentStack] = useState<CurrentStackType>(null);

  const isPlayerTurn = (playerId: number) =>
    gameState.currentPlayer === playerId;

  const handleNextTurn = () => {
    const { totalPlayers, direction, currentPlayer } = gameState;
    const nextPlayer = handleTurn(totalPlayers, direction, currentPlayer);

    setGameState((prevState) => ({
      ...prevState,
      currentPlayer: nextPlayer,
    }));
  };

  const giveCardsToPlayer = (playerId: number, cardsToDraw: number) => {
    // Check if the draw stack has enough cards
    if (gameState.drawStack.length < cardsToDraw) {
      toast.error("Not enough cards in the draw stack to distribute.");
      return;
    }

    // Draw the specified number of cards from the draw stack
    const drawnCards = gameState.drawStack.slice(0, cardsToDraw);
    const updatedDrawStack = gameState.drawStack.slice(cardsToDraw);

    // Update the player's hand
    setGameState((prevState) => ({
      ...prevState,
      players: {
        ...prevState.players,
        [playerId]: [...prevState.players[playerId], ...drawnCards],
      },
      drawStack: updatedDrawStack, // Update the draw stack
    }));

    // Notify about the card draw
    toast.success(`Player ${playerId} drew ${cardsToDraw} cards.`);
  };

  const drawCardsForPlayer = (playerId: number) => {
    if (drawStack > 0) {
      giveCardsToPlayer(playerId, drawStack);
      setDrawStack(0); // Reset the draw stack count
      setCurrentStack(null); // Reset the current stack type
      handleNextTurn(); // Proceed to the next turn
    } else {
      toast.error("No cards to draw.");
    }
  };

  const handleDrawStack = (playerId: number, card: CardType) => {
    console.log("PlayerID", playerId);
    const { action } = getCardInfo(card.name);
    console.log("Action", action);
    if (currentStack) {
      // When there is an active draw stack
      if (currentStack === "draw4" && action === "W_D") {
        // Stacking a +4 on an existing +4
        setDrawStack((prev) => prev + 4);
      } else if (
        currentStack === "draw2" &&
        !action?.startsWith("W") &&
        action?.endsWith("D")
      ) {
        // Stacking a +2 on an existing +2
        setDrawStack((prev) => prev + 2);
      } else if (currentStack === "draw2" && action === "W_D") {
        // Upgrading a +2 stack to a +4
        setCurrentStack("draw4");
        setDrawStack((prev) => prev + 4);
      }
    } else if (action?.endsWith("D")) {
      // Starting a new draw stack
      const isDraw4 = action === "W_D";
      setDrawStack((prev) => prev + (isDraw4 ? 4 : 2));
      setCurrentStack(isDraw4 ? "draw4" : "draw2");
    }
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
    handleNextTurn();
  };

  // const handleCardDrop = (draggedCard: CardType) => {
  //   if (!isPlayerTurn(gameState.currentPlayer)) {
  //     toast.error("It's not your turn.");
  //     return;
  //   }
  //   const name = draggedCard.name;
  //   const { color, action, isOpenModel } = getCardInfo(draggedCard.name);
  //   //TODO: check color and action of the card.
  //   if (name === "Wild") {
  //     setIsModalOpen(true);
  //   } else {
  //     if (!color || !action) {
  //       //? Card is a wild draw 4
  //       handleDrawStack(gameState.currentPlayer, draggedCard);
  //       setIsModalOpen(true);
  //     }
  //     if (action?.endsWith("D")) {
  //       //
  //       handleDrawStack(gameState.currentPlayer, draggedCard);
  //     }
  //   }
  //   // If the card is a wild card, open the modal to select the color
  //   const newDirection = handleDirection(draggedCard, gameState.direction);
  //   const currentPlayerDeck = (prev: CardType[]) =>
  //     prev.filter((card) => card.id !== draggedCard.id);
  //   setGameState((prevState) => ({
  //     ...prevState,
  //     playingCard: draggedCard,
  //     currentColor: color,
  //     currentAction: action,
  //     direction: newDirection,
  //     players: {
  //       ...prevState.players,
  //       [gameState.currentPlayer]: currentPlayerDeck(
  //         prevState.players[gameState.currentPlayer]
  //       ),
  //     },
  //   }));
  //   setIsModalOpen(isOpenModel);
  //   handleNextTurn();
  // };

  const handleCardDrop = (draggedCard: CardType) => {
    if (!isPlayerTurn(gameState.currentPlayer)) {
      toast.error("It's not your turn.");
      return;
    }

    const name = draggedCard.name;
    const { color, action } = getCardInfo(draggedCard.name);

    // Handle wild cards
    if (name === "Wild") {
      setIsModalOpen(true); // Open modal to choose a color
    }
    // Handle wild draw cards
    else if (action === "W_D") {
      handleDrawStack(gameState.currentPlayer, draggedCard);
      setIsModalOpen(true); // Open modal to choose a color
    }
    // Handle draw cards (e.g., Draw 2)
    else if (action?.endsWith("D")) {
      handleDrawStack(gameState.currentPlayer, draggedCard);
    }
    // Handle skip cards
    else if (action === "S") {
      toast.info("Player skipped!");
      handleNextTurn(); // Skip the next player's turn
    }
    // Handle reverse cards
    else if (action === "R") {
      toast.info("Direction reversed!");
      const newDirection = handleDirection(draggedCard, gameState.direction);
      setGameState((prevState) => ({
        ...prevState,
        direction: newDirection, // Update game direction
      }));
    }

    // Update the game state for normal cards or other card types
    const currentPlayerDeck = (prev: CardType[]) =>
      prev.filter((card) => card.id !== draggedCard.id);

    setGameState((prevState) => ({
      ...prevState,
      playingCard: draggedCard, // Set the played card as the current card
      currentColor: color, // Update the current color
      currentAction: action, // Update the current action
      players: {
        ...prevState.players,
        [gameState.currentPlayer]: currentPlayerDeck(
          prevState.players[gameState.currentPlayer]
        ), // Remove the played card from the player's deck
      },
    }));
    toast.info(`Player ${gameState.currentPlayer} played a card.`);

    // Open the modal if required for certain cards
    // setIsModalOpen(isOpenModel);

    // Proceed to the next player's turn (if not skipped/reversed)
    if (action !== "S" && action !== "R") {
      handleNextTurn();
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

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
        <Game
          gameState={{
            currentPlayer: gameState.currentPlayer,
            players: gameState.players,
            drawStack: gameState.drawStack,
            playingCard: gameState.playingCard,
            direction: gameState.direction,
          }}
        />
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

export default App;
