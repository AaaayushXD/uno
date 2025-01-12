import React from "react";
import { motion, TargetAndTransition, VariantLabels } from "motion/react";
import { Cards } from "../../card";
import { Cards as CardType } from "../../@types/Cards";
import { Draggable } from "../draggable/draggable";

type UserCardProps = {
  card: CardType;
  whileHover: VariantLabels | TargetAndTransition | undefined;
};

export const UserCard: React.FC<UserCardProps> = ({ card, whileHover }) => {
  return (
    <Draggable id={card.id}>
      <motion.img
        src={`/cards/${Cards[card.name]}`}
        className={"w-[150px] cursor-grab"}
        whileHover={whileHover}
      />
    </Draggable>
  );
};
