import { useEffect } from "react";
import ReactPortal from "./reactPortal";

const Uno = () => {
  useEffect(() => {
    const sound = new Audio("/sound/uno.mp3");
    sound.play();
  }, []);

  return (
    <ReactPortal wrapperId="uno_button">
      <div
        className="absolute top-0 left-0 flex items-center justify-center w-full min-h-screen bg-black bg-opacity-50 select-none"
        style={{ zIndex: 100 }}
      >
        <img src="/uno_logo.svg" />
      </div>
    </ReactPortal>
  );
};

export default Uno;
