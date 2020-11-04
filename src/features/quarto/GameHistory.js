import React from 'react'
import { useSelector } from 'react-redux'
import GameHistoryCard from './GameHistoryCard'
import { selectGameHistory } from './quartoSlice'


const GameHistory = () => {
    const gameHistoryStyle = {
        padding: '10px',
        borderRadius: '45px 0px 0px 0px',
        background: '#fff',
        marginTop: '10px'
    }

    const gameHistory = useSelector(selectGameHistory)

    const gameHistoryCards = gameHistory.map(({player, phase, pieceId, tileIndex}, i) => {
        return (
            <GameHistoryCard 
                player={player} 
                phase={phase} 
                pieceId={pieceId} 
                tileIndex={tileIndex}
                key={i} />)
    })

    return (
        <div className="game-history" style={gameHistoryStyle}>
            <div className="title dark">Game History</div>
            <div className="stepper">Stepper Goes Here</div>
            {gameHistoryCards}
        </div>
    )
}

export default GameHistory