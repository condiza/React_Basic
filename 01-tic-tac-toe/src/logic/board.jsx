export const checkWinnerFrom = (boardToCheck, needed = 3) => {
  const rows = 3; // filas
  const cols = 3; // columnas

  // direcciones para revisar
  const directions = [
    [0, 1],   // derecha
    [1, 0],   // abajo
    [1, 1],   // diagonal ↘
    [1, -1]   // diagonal ↙
  ];

  const getCell = (r, c) => boardToCheck[r * cols + c];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = getCell(row, col);
      if (!cell) continue;

      for (const [dr, dc] of directions) {
        let count = 1;

        for (let step = 1; step < needed; step++) {
          const r = row + dr * step;
          const c = col + dc * step;

          // fuera del tablero → rompe
          if (r < 0 || r >= rows || c < 0 || c >= cols) break;

          if (getCell(r, c) === cell) {
            count++;
          } else {
            break;
          }
        }

        if (count === needed) {
          return cell; // ganador encontrado
        }
      }
    }
  }

  return null; // sin ganador
};

export const checkEndGame = (newBoard) => {
    // revisa si hay un empate
    // si no hay espacios nulos
    // en el tablero
    return newBoard.every( (square) => square !== null)
}