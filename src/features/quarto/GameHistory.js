import React from 'react'
import { useSelector } from 'react-redux'
import GameHistoryCard from './GameHistoryCard'

const GameHistory = () => {
    const gameHistory = useSelector(selectGameHistory)

    const gameHistoryCards = gameHistory.map(({player, phase, pieceId, tileIndex}) => {
        return (
            <GameHistoryCard 
                player={player} 
                phase={phase} 
                pieceId={pieceId} 
                tileIndex={tileIndex} />)
    })
}