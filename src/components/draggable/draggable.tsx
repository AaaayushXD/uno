/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDraggable } from "@dnd-kit/core";
import React from "react";

type DraggableProps = {
  id: string;
  children: React.ReactNode;
  data?: Record<string, any>;
  disabled?: any;
};

export const Draggable: React.FC<DraggableProps> = ({
  id,
  children,
  data,
  disabled,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data,
      disabled,
    });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px , 0)`
      : undefined,
    zIndex: isDragging ? 9999 : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
