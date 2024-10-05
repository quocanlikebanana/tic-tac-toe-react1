import PropTypes from "prop-types"
import { useState } from "react"
import "./Form.css"

export default function Form({ inrow, incol, iwinLength, onSettingApplied }) {
    const [nrow, setNrow] = useState(inrow)
    const [ncol, setNcol] = useState(incol)
    const [winLength, setWinLength] = useState(iwinLength)
    return (
        <div className="settings">
            <label>
                Number of rows:
            </label>
            <input value={nrow} onChange={(e) => setNrow(parseInt(e.target.value))} min="1" max="30" type="number" />
            <label>
                Number of columns:
            </label>
            <input value={ncol} onChange={(e) => setNcol(parseInt(e.target.value))} min="1" max="30" type="number" />
            <label>
                Win length:
            </label>
            <input value={winLength} onChange={(e) => setWinLength(parseInt(e.target.value))} min="2" max="30" type="number" />
            <button onClick={() => onSettingApplied(nrow, ncol, winLength)}>Reset</button>
        </div>
    )
}

Form.propTypes = {
    inrow: PropTypes.number.isRequired,
    incol: PropTypes.number.isRequired,
    iwinLength: PropTypes.number.isRequired,
    onSettingApplied: PropTypes.func.isRequired,
}
