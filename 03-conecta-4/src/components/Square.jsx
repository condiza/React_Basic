import { TURNS } from "../constans";

export const Square = ({ children, onClick, activeRowIndex, columnIndex }) => {
  // Clase base para la ranura del tablero
  let slotClassName = "square-slot";

  // Clase para la ficha (si existe)
  let tokenClassName = "";
  if (children === TURNS.RED) {
    tokenClassName = "token-red";
  } else if (children === TURNS.YELLOW) {
    tokenClassName = "token-yellow";
  }

  const handleClick = () => {
    onClick(columnIndex);
  };

  const handleMouseEnter = (e) => {
    if (activeRowIndex !== null) {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = 'var(--slot-shadow)';
  };

  return (
    <div 
      className={slotClassName} 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* La ficha real dentro de la ranura */}
      {children && <div className={tokenClassName} />}
    </div>
  );
};