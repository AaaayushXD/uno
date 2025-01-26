import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8080"); // Update with your backend URL

export const WaitingPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [isPlayerOne, setIsPlayerOne] = useState(false);
  const [playersInRoom, setPlayersInRoom] = useState<string[]>([]);

  useEffect(() => {
    if (state && state.roomId) {
      const timestamp = Date.now();
      const playerNumber = Math.floor((timestamp / 1000) % 10) + 1;
      const existingPlayerName = localStorage.getItem("playerName");
      const generatedPlayerName = `Player ${playerNumber}`;
      const finalPlayerName = existingPlayerName || generatedPlayerName;

      setPlayerName(finalPlayerName);
      setIsPlayerOne(playerNumber === 1);

      // Save player name and roomId to localStorage
      localStorage.setItem("playerName", finalPlayerName);
      localStorage.setItem("roomId", state.roomId);

      // Emit joinRoom event only once
      socket.emit("joinRoom", {
        roomId: state.roomId,
        userId: socket.id,
      });

      // Listen for userJoined events
      socket.on("userJoined", ({ userId }) => {
        setPlayersInRoom((prev) => [...prev, userId]);
      });

      // Listen for userLeft events
      socket.on("userLeft", ({ userId }) => {
        setPlayersInRoom((prev) => prev.filter((id) => id !== userId));
      });

      // Listen for gameStarted events
      socket.on("gameStarted", ({ gameState }) => {
        navigate("/game", { state: { roomId: state.roomId, gameState } });
      });
    }

    return () => {
      // Emit leaveRoom event only if the player exists
      const storedRoomId = localStorage.getItem("roomId");
      const storedPlayerName = localStorage.getItem("playerName");
      if (storedRoomId && storedPlayerName) {
        socket.emit("leaveRoom", {
          roomId: storedRoomId,
          userId: socket.id,
        });
      }
      localStorage.removeItem("playerName");
      localStorage.removeItem("roomId");
    };
  }, [navigate, state]);

  const handleStartGame = () => {
    if (!isPlayerOne) return;

    // Emit start game event to the backend
    socket.emit("startGame", { roomId: state.roomId });
  };

  const handleLeaveRoom = () => {
    // Notify the server that the player is leaving the room
    socket.emit("leaveRoom", { roomId: state.roomId, userId: socket.id });

    // Navigate back to the home screen or room selection
    navigate("/");
  };

  if (!state || !state.roomId) {
    return <div className="text-center">Invalid room. Please try again.</div>;
  }

  return (
    <div
      className="flex items-center justify-center object-cover min-h-screen bg-cover"
      style={{
        backgroundImage: `url(${"/cards/Table_1.png"})`,
      }}
    >
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
          Waiting Room
        </h1>
        <p className="mb-2 text-lg text-gray-700">
          Room Code: <span className="font-medium">{state.roomId}</span>
        </p>
        <p className="text-lg text-gray-700">
          You are{" "}
          <span className="font-medium text-green-600">{playerName}</span>
        </p>
        <p className="mt-4 text-center text-gray-600">
          Players in room: {playersInRoom.length}
        </p>

        <div className="flex justify-center mt-6 space-x-4">
          {isPlayerOne && (
            <button
              onClick={handleStartGame}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none"
            >
              Start Game
            </button>
          )}
          <button
            onClick={handleLeaveRoom}
            className="px-4 py-2 text-white bg-red-600 rounded-lg shadow hover:bg-red-700 focus:outline-none"
          >
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
};
