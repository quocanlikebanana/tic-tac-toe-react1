import PropTypes, { arrayOf, number, string } from "prop-types"
import Square from "./Square/Square"
import "./Board.css"

function Board({ square2d, winStack, currentMove, onSquareClicked }) {
    const nrow = square2d.length
    const ncol = square2d[0].length

    const winningSquareMap = Array(nrow).fill(null).map(() => Array(ncol).fill(false))
    winStack.forEach(winSquare => {
        winningSquareMap[winSquare[0]][winSquare[1]] = true
    })

    const renderSquares = square2d.map((squares, i) => {
        return squares.map((s, j) => {
            return <Square key={[i, j]} state={s} winningSquare={winningSquareMap[i][j]} currentMove={currentMove == null ? false : currentMove[0] === i && currentMove[1] === j} onClick={() => onSquareClicked(i, j)}></Square>
        })
    })

    return (
        <div style={{
            "--grid-size-col": ncol,
            "--grid-size-row": nrow
        }} className="board">
            {renderSquares}
        </div>
    )
}

export default Board

Board.propTypes = {
    winStack: PropTypes.array.isRequired,
    currentMove: PropTypes.arrayOf(number),
    square2d: PropTypes.arrayOf(arrayOf(string)).isRequired,
    onSquareClicked: PropTypes.func.isRequired,
}
