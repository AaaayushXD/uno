export const createPlayerMap = (totalPlayers: number): Map<number, string> => {
  const playerMap = new Map<number, string>();
  for (let i = 0; i < totalPlayers; i++) {
    playerMap.set(i, `player ${i + 1}`);
  }
  return playerMap;
};
