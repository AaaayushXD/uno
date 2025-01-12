import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Container } from "../../@types/Container";

const Containers = ({
  children,
  container,
  style,
}: {
  children: React.ReactNode;
  container: Container;
  style?: React.CSSProperties;
}) => {
  const { setNodeRef } = useDroppable({
    id: container,
  });
  return (
    <div style={style} ref={setNodeRef}>
      {children}
    </div>
  );
};

export default Containers;
