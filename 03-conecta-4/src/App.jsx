import { useState } from "react";
import confetti from "canvas-confetti";
import { checkEndGame, checkWinnerFrom, findNextAvailableRow } from "./logic/board";
import { TURNS } from "./constans";
import { WinnerModal } from "./components/WinnerModal";
import { Square } from "./components/Square";
import { resetGameStorage, saveGameToStorage } from "./logic/storage";

const ROWS = 6;
const COLS = 7;

export default function App() {
  // Inicialización del tablero 6x7
  const initialBoard = () => Array(ROWS).fill(null).map(() => Array(COLS).fill(null));

  const [board, setBoard] = useState(()=>{
    const boardStorage = JSON.parse(localStorage.getItem('board'));
    if (boardStorage) return boardStorage;
    return initialBoard();
  });
  const [turn, setTurn] = useState(TURNS.RED);
  const [winner, setWinner] = useState(null); // null: sin ganador, false: empate, 'R'/'Y': ganador

  const resetGame = () => {
    setBoard(initialBoard());
    setTurn(TURNS.RED);
    setWinner(null);
    resetGameStorage();
  };

  /**
   * Maneja el clic en una columna.
   */
  const updateBoard = (colIndex) => {
    if (winner) return;

    // 1. Encontrar la fila donde la ficha caerá (bottom-up logic)
    const rowIndex = findNextAvailableRow(board, colIndex);
    if (rowIndex === null) return; // Columna llena

    // 2. Actualizar el tablero
    const newBoard = board.map((r) => [...r]);
    newBoard[rowIndex][colIndex] = turn;
    setBoard(newBoard);
    saveGameToStorage({ board: newBoard, turn });

    // 3. Revisar ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti({ particleCount: 150, spread: 60, origin: { y: 0.6 } });
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // Empate
    } else {
      // 4. Cambiar turno
      const newTurn = turn === TURNS.RED ? TURNS.YELLOW : TURNS.RED;
      setTurn(newTurn);
    }
  };
  
  // Clase de color para el indicador de turno
  const turnIndicatorClass = turn === TURNS.RED ? "indicator-red" : "indicator-yellow";

  return (
    <>
      <div className="app-container">
        <main className="main-content">
          <h1 className="game-title" translate="no">
            CONECTA 4
          </h1>
          
          {/* Botón de Reiniciar */}
          <div className="reset-container">
              <button
                onClick={resetGame}
                className="reset-button"
              >
                Reiniciar Juego
              </button>
          </div>

          {/* Indicador de Turno */}
          <section className="turn-indicator-section">
            <div className="turn-indicator-box">
              <span className="turn-text">Turno:</span>
              <div className={`turn-token ${turnIndicatorClass}`} />
            </div>
          </section>

          {/* Tablero del Juego (Grid) */}
          <section className="game-board-section">
            <div className="game-grid" style={{ 
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`
            }}>
              {board.map((row, rowIndex) => (
                row.map((cell, colIndex) => {
                  // Determina la siguiente fila válida para el hover visual (solo la de arriba)
                  const nextRow = findNextAvailableRow(board, colIndex);

                  return (
                    <Square
                      key={`${rowIndex}-${colIndex}`}
                      children={cell}
                      onClick={() => updateBoard(colIndex)}
                      rowIndex={rowIndex}
                      columnIndex={colIndex}
                      // Indica si esta celda es la "cima" de la columna, permitiendo el clic
                      activeRowIndex={nextRow === rowIndex ? rowIndex : null}
                    />
                  )
                })
              ))}
            </div>
          </section>

        </main>

        <WinnerModal resetGame={resetGame} winner={winner} />
      </div>
    </>
  );
}
