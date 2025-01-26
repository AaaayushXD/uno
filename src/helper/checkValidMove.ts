import { Cards, Color } from "../@types/Cards";
import { getCardInfo } from "../utils/getCardInfo";

export const isValidMove = (
  playedCard: Cards,
  currentColor: Color,
  currentAction: string | null
): boolean => {
  if (playedCard.name === "Wild" || playedCard.name === "W_D") return true;

  const { color, action } = getCardInfo(playedCard.name);

  if (color === currentColor && !currentAction) return true;
  if (color === currentColor || action === currentAction) return true;
  return false;
};
