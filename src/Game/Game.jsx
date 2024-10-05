import { useState } from "react";
import Board from "./Board/Board";
import "./Game.css"
import Form from "./Form/Form";

function getWinner(square2d, winLength) {
    const nrow = square2d.length
    const ncol = square2d[0].length
    let symbol = null
    let winStack = []
    let count = 0

    function isWin(i, j) {
        if (square2d[i][j] === null) {
            symbol = null
            count = 0
            winStack = []
        }
        else if (square2d[i][j] === symbol) {
            count += 1
            winStack.push([i, j])
        }
        else if (square2d[i][j] !== symbol) {
            symbol = square2d[i][j]
            count = 1
            winStack = [[i, j]]
        }
        if (count === winLength) {
            return true
        }
        return false
    }

    // Check rows
    for (let i = 0; i < nrow; i++) {
        symbol = null
        count = 0
        for (let j = 0; j < ncol; j++) {
            if (isWin(i, j)) return [symbol, winStack]
        }
    }

    // Check columns
    for (let j = 0; j < ncol; j++) {
        symbol = null
        count = 0
        for (let i = 0; i < nrow; i++) {
            if (isWin(i, j)) return [symbol, winStack]
        }
    }

    // Check main diagonal
    {
        let s = 0 - nrow + 1
        while (s < ncol) {
            let i = 0
            let j = 0
            if (s < 0) {
                i = -1 * s
            } else {
                j = s
            }
            symbol = null
            count = 0
            while (i < nrow && j < ncol) {
                if (isWin(i, j)) return [symbol, winStack]
                i += 1
                j += 1
            }
            s += 1
        }
    }

    // Check secondary diagonal
    {
        let s = ncol + nrow - 2
        while (s >= 0) {
            let i = 0
            let j = ncol - 1
            if (s > ncol - 1) {
                i = s - (ncol - 1)
            } else {
                j = s
            }
            symbol = null
            count = 0
            while (i < nrow && j >= 0) {
                if (isWin(i, j)) return [symbol, winStack]
                i += 1
                j -= 1
            }
            s -= 1
        }
    }
    return [null, []];
}

function createEmptyBoard(nrow, ncol) {
    return Array.from({ length: nrow }, () => Array.from({ length: ncol }, () => null))
}

export default function Game() {
    const [winLength, setWinLength] = useState(3)
    const [square2dStack, setSquare2dStack] = useState([createEmptyBoard(3, 3)])
    const [top, setTop] = useState(0)
    const [winner, setWinner] = useState()
    const [winStack, setWinStack] = useState([])
    const [ascendingHistory, setAscendingHistory] = useState(true)
    const [moveStack, setMoveStack] = useState([])
    const currentSquare2d = square2dStack.at(top)
    const currentState = top % 2 == 0 ? "X" : "O";

    const moveInfoText = (historyIndex) => {
        const moveStackIndex = historyIndex - 1
        if (historyIndex == 0) {
            return `Go to game start`
        }
        if (historyIndex == square2dStack.length - 1) {
            return `You are at move #${historyIndex}: (${moveStack[moveStackIndex][0]}, ${moveStack[moveStackIndex][1]})`
        }
        return `Go to #${historyIndex}: (${moveStack[moveStackIndex][0]}, ${moveStack[moveStackIndex][1]})`
    }

    function handleSquareClicked(x, y) {
        if (currentSquare2d[x][y] == null && winner == null) {
            const newSquare2dStack = [...square2dStack.slice(0, top + 1)]
            const newMoveStack = [...moveStack.slice(0, top + 1)]
            const clone = currentSquare2d.map(squares => Array.from(squares)) // Deep
            clone[x][y] = currentState
            newSquare2dStack.push(clone)
            newMoveStack.push([x, y])
            const [newWinner, newWinStack] = getWinner(clone, winLength)
            setWinner(newWinner)
            setWinStack(newWinStack)
            setSquare2dStack(newSquare2dStack)
            setMoveStack(newMoveStack)
            setTop(top + 1)
        }
    }

    function handleUndo(index) {
        setTop(index)
        const [newWinner, newWinStack] = getWinner(square2dStack.at(index), winLength)
        setWinner(newWinner)
        setWinStack(newWinStack)
    }

    function handleSettingsApplied(nrow, ncol, winLength) {
        setWinLength(winLength)
        setSquare2dStack([createEmptyBoard(nrow, ncol)])
        setMoveStack([])
        setTop(0)
        setWinStack([])
        setWinner(null)
    }

    function handleToggleHistoryClick() {
        setAscendingHistory(!ascendingHistory)
    }

    return (
        <div className="main-container">
            <div className="info">
                {winner ? `Winner is ${winner}` : (top === currentSquare2d.length * currentSquare2d[0].length ? `Draw` : `${currentState}'s turn`)}
            </div>
            <div className="container">
                <div className="board-container">
                    <Board square2d={currentSquare2d} winStack={winStack} currentState={currentState} currentMove={moveStack.length === 0 ? null : moveStack[moveStack.length - 1]} onSquareClicked={handleSquareClicked} ></Board>
                </div>
                <div className="side">
                    <div className="history-container">
                        <button onClick={handleToggleHistoryClick} className="toggle-history-order">{ascendingHistory ? "Descending" : "Ascending"}</button>
                        <div className="history-list">
                            {
                                square2dStack.map((_, i) => {
                                    const index = ascendingHistory ? i : square2dStack.length - 1 - i
                                    return <a className="history-item" key={index} onClick={() => handleUndo(index)}>{moveInfoText(index)}</a>
                                })
                            }
                        </div>
                    </div>
                    <Form inrow={currentSquare2d.length} incol={currentSquare2d[0].length
                    } iwinLength={winLength} onSettingApplied={handleSettingsApplied}></Form>
                </div>
            </div>
        </div>
    )
}
