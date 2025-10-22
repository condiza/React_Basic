import { WINNER_COMBOS } from "../constans"

export const checkWinnerFrom = (boardToCheck) => {
    // revisamos la posibles formas de ganar
    // para saber si ha ganado x U o

    for ( const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a]
        }
    }
    // sino hay ganador
    return null
}

export const checkEndGame = (newBoard) => {
    // revisa si hay un empate
    // si no hay espacios nulos
    // en el tablero
    return newBoard.every( (square) => square !== null)
}