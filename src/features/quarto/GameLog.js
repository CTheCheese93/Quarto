import React from 'react'
import { useSelector } from 'react-redux'
import GameLogCard from './GameLogCard'
import { selectGameLog } from './quartoSlice'


const GameLog = () => {
    const gameLogStyle = {
        padding: '10px',
        borderRadius: '35px 0px 0px 0px',
        background: '#fff',
        marginTop: '10px',
        flex: '1',
        overflow: 'hidden',
    }

    const gameLog = useSelector(selectGameLog)

    const gameLogCards = gameLog.map(({player, phase, pieceId, tileIndex}, i) => {
        return (
            <GameLogCard 
                player={player} 
                phase={phase} 
                pieceId={pieceId} 
                tileIndex={tileIndex}
                key={i} />)
    })

    return (
        <div className="game-history" style={gameLogStyle}>
            <div className="title dark">Game Log</div>
            <div className="stepper">Stepper Goes Here</div>
            <div className="gameHistoryList">
                {gameLogCards}
            </div>
        </div>
    )
}

export default GameLog