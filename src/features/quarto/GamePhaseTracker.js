import React from 'react'
import { useSelector } from 'react-redux'
import { PHASE_TEMPLATES } from './CONSTANTS'
import PieceImage from './PieceImage'
import { selectCurrentPhase, selectCurrentPlayer, selectPlayerHasWon, selectPlayers, selectSelectedPiece } from './quartoSlice'


const GamePhaseTracker = () => {
    const currentPhase = useSelector(selectCurrentPhase)
    const currentPlayer = useSelector(selectCurrentPlayer)
    const selectedPiece = useSelector(selectSelectedPiece)
    const playerHasWon = useSelector(selectPlayerHasWon)
    const players = useSelector(selectPlayers)
    const player = players.find(p => p.role === currentPlayer)
    
    return (
        <div className="game-phase-tracker">
            <div className={`player-turn ${playerHasWon ? 'hidden' : ''}`}>
                {Boolean(player) ? player.name : 'Someone'}'s Turn
            </div>
            <div className={`player-turn ${playerHasWon ? '' : 'hidden'}`}>
                {Boolean(player) ? player.name : 'Someone'} has won!
            </div>
            <div className={`phase-instructions ${playerHasWon ? 'hidden' : ''}`}>
                {
                    Boolean(player)
                    ? PHASE_TEMPLATES[currentPhase](player.name)
                    : 'You must start a game!'
                }
            </div>
            <div className={`phase-instructions ${playerHasWon ? '' : 'hidden'}`}>
                Do you want to play again?
            </div>
            <div className="selected-piece">
                { selectedPiece === null ? '' : (<PieceImage pieceId={selectedPiece} />) }
            </div>
        </div>
    )
}

export default GamePhaseTracker