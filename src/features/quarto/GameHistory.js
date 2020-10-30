import React from 'react'
import { useSelector } from 'react-redux'
import GameHistoryCard from './GameHistoryCard'
import { selectGameHistory } from './quartoSlice'


const GameHistory = () => {
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
        <div className="game-history">
            {gameHistoryCards}
        </div>
    )
}

export default GameHistory