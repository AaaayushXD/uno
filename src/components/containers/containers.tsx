import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Container } from "../../@types/Container";

const Containers = ({
  children,
  container,
  style,
  className,
}: {
  children: React.ReactNode;
  container: Container;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const { setNodeRef } = useDroppable({
    id: container,
  });
  return (
    <div
      style={style}
      ref={setNodeRef}
      data-container={container}
      className={className}
    >
      {children}
    </div>
  );
};

export default Containers;
