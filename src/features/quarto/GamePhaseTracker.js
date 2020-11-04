import React from 'react'
import { useSelector } from 'react-redux'
import { PHASE_TEMPLATES } from './CONSTANTS'
import PieceImage from './PieceImage'
import { selectCurrentPhase, selectCurrentPlayer, selectPlayerHasWon, selectPlayers, selectSelectedPiece } from './quartoSlice'


const GamePhaseTracker = () => {
    const barStyle = {
        height: '2px',
        background: '#000',
        width: '30%',
        margin: '0px 10px 0px 10px'
    }

    const spacerPiece = {
        height: '100px',
        width: '100px',
    }

    const gptStyle = {
        background: '#fff',
        borderRadius: '0px 0px 35px 0px',
        padding: '10px'
    }

    const selectedPieceStyle = {
        marginTop: '15px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const currentPhase = useSelector(selectCurrentPhase)
    const currentPlayer = useSelector(selectCurrentPlayer)
    const selectedPiece = useSelector(selectSelectedPiece)
    const playerHasWon = useSelector(selectPlayerHasWon)
    const players = useSelector(selectPlayers)
    const player = players.find(p => p.role === currentPlayer)
    
    return (
        <div className="game-phase-tracker" style={gptStyle}>
            <div className={`title dark ${playerHasWon ? 'hidden' : ''}`}>
                {Boolean(player) ? player.name : 'Someone'}'s Turn
            </div>
            <div className={`title dark ${playerHasWon ? '' : 'hidden'}`}>
                {Boolean(player) ? player.name : 'Someone'} has won!
            </div>
            <div className={`caption ${playerHasWon ? 'hidden' : ''}`}>
                {
                    Boolean(player)
                    ? PHASE_TEMPLATES[currentPhase](player.name)
                    : 'You must start a game!'
                }
            </div>
            <div className={`caption ${playerHasWon ? '' : 'hidden'}`}>
                Do you want to play again?
            </div>
            <div className="selected-piece" style={selectedPieceStyle}>
                <div style={barStyle} />
                { selectedPiece === null ? <div style={spacerPiece} /> : (<PieceImage pieceId={selectedPiece} />) }
                <div style={barStyle} />
            </div>
        </div>
    )
}

export default GamePhaseTracker