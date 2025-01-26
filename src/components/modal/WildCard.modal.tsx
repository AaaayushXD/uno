import React from "react";
import { Color } from "../../@types/Cards";

interface WildCardModalProps {
  onSelectColor: (color: Color) => void;
}

const WildCardModal: React.FC<WildCardModalProps> = ({ onSelectColor }) => {
  const colors: { name: Color; bgColor: string }[] = [
    { name: "red", bgColor: "bg-red-500" },
    { name: "green", bgColor: "bg-green-500" },
    { name: "blue", bgColor: "bg-blue-500" },
    { name: "yellow", bgColor: "bg-yellow-500" },
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: 99999 }}
    >
      <div className="p-6 text-white bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-center">Select a Color</h2>
        <div className="flex justify-center space-x-4">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => {
                onSelectColor(color.name);
              }}
              className={`w-12 h-12 rounded-full ${color.bgColor} hover:opacity-75`}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WildCardModal;
