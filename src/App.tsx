import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { RoomPage } from "./pages/RoomPage";
import { Main } from "./pages/Main";
import { WaitingPage } from "./pages/WaitingPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room" element={<RoomPage />} />
      <Route path="/game" element={<Main />} />
      <Route path="/waiting" element={<WaitingPage />} />
    </Routes>
  );
};
