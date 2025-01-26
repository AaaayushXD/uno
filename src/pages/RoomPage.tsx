import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { gameState } from "../@types/Game";
import { socket } from "../utils/socket";

export const RoomPage: React.FC = () => {
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const [gameState, setGameState] = useState<gameState | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Listen for events from the server
    socket.on("roomJoined", ({ roomId, gameState }) => {
      console.log(`Joined room ${roomId}`);
      console.log("Game state:", gameState);
      setGameState(gameState);
      navigate("/waiting", { state: { roomId } });
    });

    socket.on("joinError", ({ message }) => {
      toast.error(message);
      setJoinRoomCode("");
    });

    socket.on("gameStateUpdated", ({ gameState }) => {
      console.log("Game state updated:", gameState);
      setGameState(gameState);
    });

    return () => {
      socket.off("roomJoined");
      socket.off("joinError");
      socket.off("gameStateUpdated");
    };
  }, [navigate]);

  const handleJoinRoom = async () => {
    try {
      if (!joinRoomCode.trim()) {
        toast.error("Please enter a room code.");
        return;
      }
      console.log("Joining room:", joinRoomCode);
      socket.emit("joinRoom", { roomId: joinRoomCode, userId: socket.id });
    } catch (error) {
      toast.error("Failed to join room. Try again." + error);
    } finally {
      setJoinRoomCode("");
    }
  };

  return (
    <div
      className="flex items-center justify-center object-cover min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${"/cards/Table_2.png"})` }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          UNO Game Room
        </h1>
        <div className="space-y-6">
          {/* Join Room Section */}
          <div>
            <h2 className="mb-2 text-lg font-medium text-gray-700">
              Join a Room
            </h2>
            <input
              type="text"
              value={joinRoomCode}
              onChange={(e) => setJoinRoomCode(e.target.value)}
              placeholder="Enter Room Code"
              className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleJoinRoom}
              className="w-full py-3 text-lg font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
