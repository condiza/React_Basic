export const saveGameToStorage = ({board, turn}) => {
    //guardamos el estado del juego en el localStorage
    window.localStorage.setItem('board', JSON.stringify(board));
    // guardamos el turno en el localStorage
    window.localStorage.setItem('turn',turn);
}

// funcion para resetear el almacenamiento
export const resetGameStorage = () => {
    // eliminamos el estado del juego del localStorage
    window.localStorage.removeItem('board');
    // eliminamos el turno del localStorage
    window.localStorage.removeItem('turn');

}