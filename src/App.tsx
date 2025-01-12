import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Game from "./pages/Game";
import { Container } from "./@types/Container";

function App() {
  // const [containers, setContainers] = useState<ContainerProps | null>(null);
  // const [activeContainerId, setActiveContainerId] = useState<string>("");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id as string;
    const newStatus = over.id as Container;

    
  };
  return (
    <>
      {/* <HomePage /> */}
      <DndContext onDragEnd={handleDragEnd}>
        <Game />
      </DndContext>
    </>
  );
}

export default App;
