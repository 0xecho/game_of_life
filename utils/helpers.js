export function getNeighboursForCell(board, i, j) {
    const neighbours = []
    
    // check all 8 directions 
    if( i>0  && j>0 ) neighbours.push(board[i-1][j-1])
    if( i>0  ) neighbours.push(board[i-1][j])
    if( i>0  && j<board[0].length-1 ) neighbours.push(board[i-1][j+1])
    if( j>0 ) neighbours.push(board[i][j-1])
    if( j<board[0].length-1 ) neighbours.push(board[i][j+1])
    if( i<board.length-1  && j>0 ) neighbours.push(board[i+1][j-1])
    if( i<board.length-1  ) neighbours.push(board[i+1][j])
    if( i<board.length-1  && j<board[0].length-1 ) neighbours.push(board[i+1][j+1])

    return neighbours
}

export function flatToGrid(flatBoard) {
    let squareSize = Math.floor(Math.sqrt(flatBoard.length))
    if (Math.pow(squareSize, 2) != flatBoard.length) throw "Cell list length is not a perfect square. Cell list should be a single dimetional array whose length is a perfect square, or a two dimensional array with equal number of row and columns"
    let newBoard = []
    for (let i = 0; i < flatBoard.length; i += squareSize) {
        newBoard.push(flatBoard.slice(i, i + squareSize))
    }
    return newBoard
}