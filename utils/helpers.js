export function getNeighboursForCell(board, i, j) {
    const neighbours = []
    const boardSize = Math.floor(Math.sqrt(board.length))
    if (i > 0) {
        neighbours.push(board[ (i - 1) * boardSize + j])
    }
    if (i < boardSize - 1) {
        neighbours.push(board[(i + 1) * boardSize + j])
    }
    if (j > 0) {
        neighbours.push(board[i * boardSize + j - 1])
    }
    if (j < boardSize - 1) {
        neighbours.push(board[i * boardSize + j + 1])
    }
    return neighbours;
}