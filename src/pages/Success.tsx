import React from "react";

interface SuccessProps {
  winner: string;
  onRestart: () => void;
}

const Success: React.FC<SuccessProps> = ({ winner, onRestart }) => {
  return (
    <div
      className="flex items-center justify-center object-cover min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${"/cards/Table_4.png"})`,
      }}
    >
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          🎉 Congratulations! 🎉
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          <span className="font-semibold text-green-600">{winner}</span> has won
          the game!
        </p>
        <button
          onClick={onRestart}
          className="px-6 py-3 text-lg font-medium text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Success;
