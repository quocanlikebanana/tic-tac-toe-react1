import PropTypes from 'prop-types';
import "./Square.css"

function defineClass(state, winningSquare, currentMove) {
    let className = "square"
    if (state != null) {
        className += " taken"
        if (state === "O") {
            className += " o"
        } else if (state === "X") {
            className += " x"
        }
    }
    if (winningSquare) {
        className += " win"
    }
    if (currentMove) {
        className += " current"
    }
    return className
}

export default function Square({ state, winningSquare, currentMove, onClick }) {
    return (
        <button className={defineClass(state, winningSquare, currentMove)} onClick={onClick}>{state}</button>
    );
}

Square.propTypes = {
    currentMove: PropTypes.bool.isRequired,
    winningSquare: PropTypes.bool.isRequired,
    state: PropTypes.string,
    onClick: PropTypes.func.isRequired
}
