import React from "react";
import Logo from "/bg.jpg";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen ">
      <div className="homePage w-[100vw] min-h-screen">
        <img src={Logo} className="min-h-screen w-[100vw]" />
      </div>

      <button
        className="absolute text-3xl font-semibold tracking-wider text-white bg-red-600 p-7 rounded-3xl hover:bg-red-700"
        onClick={() => navigate("/room")}
      >
        Start Game
      </button>
    </div>
  );
};

export default HomePage;
