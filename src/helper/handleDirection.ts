import { Cards, Direction } from "../@types/Cards";
import { getCardInfo } from "../utils/getCardInfo";

export const handleDirection = (
  playedCard: Cards,
  direction: Direction
): Direction => {
  const { action } = getCardInfo(playedCard.name);
  if (action?.endsWith("R")) {
    return direction === "clockwise" ? "anticlockwise" : "clockwise";
  }
  return direction;
};
