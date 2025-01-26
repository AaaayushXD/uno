import { Color } from "../@types/Cards";

type getCardInfoResponse = {
  color: Color | null;
  action: string | null;
  isOpenModel: boolean;
};
const COLOR_MAP: Record<string, Color> = {
  G: "green",
  B: "blue",
  R: "red",
  Y: "yellow",
};

const WILD_CARD = ["Wild", "W_D"];

export const getCardInfo = (cardName: string): getCardInfoResponse => {
  if (WILD_CARD.includes(cardName)) {
    return {
      color: null,
      action: null,
      isOpenModel: true,
    };
  }

  const [colorCode, actionCode] = cardName.split("_");
  const color: Color = COLOR_MAP[colorCode];
  if (!color) {
    throw new Error(`Invalid card: ${colorCode}`);
  }
  return { color, action: actionCode, isOpenModel: false };
};
