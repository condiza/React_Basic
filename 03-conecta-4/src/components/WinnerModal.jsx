import { TURNS } from "../constans";

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;

  const winnerText = winner === false ? "¡Empate!" : "¡Ganador!";
  
  const winnerColorClass = winner === TURNS.RED ? "text-red" : "text-yellow";
  const winnerTokenClass = winner === TURNS.RED ? "token-winner token-red" : "token-winner token-yellow";

  return (
    <section className="winner-modal-overlay">
      <div className="winner-modal-content">
        <h2 className={`winner-title ${winnerColorClass}`}>
          {winnerText}
        </h2>

        {winner && (
          <header className="winner-token-header">
            <div className={winnerTokenClass} />
          </header>
        )}

        <footer>
          <button
            onClick={resetGame}
            className="reset-button-modal"
          >
            Empezar de nuevo
          </button>
        </footer>
      </div>
    </section>
  );
};