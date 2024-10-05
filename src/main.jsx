import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Game from './Game/Game'
import "./style.css"

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Game></Game>
	</StrictMode>,
)
