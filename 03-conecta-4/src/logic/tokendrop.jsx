export const findNextAvailableRow = (board, col) => {
    const ROWS = board.length;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === null) {
      return r;
    }
  }
  return null;
};