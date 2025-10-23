export const checkWinnerFrom = (boardToCheck, needed = 4) => {
  const rows = boardToCheck.length;
  const cols = boardToCheck[0].length;

  const directions = [
    [0, 1],    // Horizontal →
    [1, 0],    // Vertical ↓
    [1, 1],    // Diagonal ↘
    [1, -1]    // Diagonal ↙
  ];

  const getCell = (r, c) => boardToCheck[r]?.[c];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = getCell(row, col);
      if (!cell) continue;

      for (const [dr, dc] of directions) {
        let count = 1;

        for (let step = 1; step < needed; step++) {
          const r = row + dr * step;
          const c = col + dc * step;

          if (r < 0 || r >= rows || c < 0 || c >= cols) break;

          if (getCell(r, c) === cell) count++;
          else break;
        }

        if (count === needed) return cell;
      }
    }
  }
  return null;
};

/**
 * Busca la siguiente fila disponible en una columna.
 */
export const findNextAvailableRow = (board, col) => {
  const ROWS = board.length;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === null) {
      return r;
    }
  }
  return null;
};

// Verifica si el juego ha terminado en empate.
export const checkEndGame = (newBoard) =>
  newBoard.flat().every((square) => square !== null);