import React from "react";
import Logo from "/bg.jpg";

const HomePage: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen ">
      <div className="homePage w-[100vw] min-h-screen">
        <img src={Logo} className="min-h-screen w-[100vw]" />
      </div>
      <div className="absolute flex flex-col items-center justify-center gap-10 px-20 py-16 glassmorph">
        <h1 className="text-5xl font-extrabold text-[#700d0d] mb-10">
          Start playing
        </h1>
        <button
          className="p-8 rounded-2xl bg-[#025502] hover:bg-[#0b8a0b] text-white text-2xl font-bold tracking-wide w-[250px]"
          id="createBtn"
        >
          Create a room
        </button>
        <button className="p-8 rounded-2xl bg-[#040496] hover:bg-[#1a25c2] text-white text-2xl font-bold tracking-wide w-[250px]">
          Join a room
        </button>
      </div>
    </div>
  );
};

export default HomePage;
