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
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    }

    const gllStyle = {
        overflowY: 'auto',
        flex: '1',
    }

    const gameLog = useSelector(selectGameLog)

    const gameLogCards = gameLog.map(({player, phase, pieceId, tileIndex, eventTime}, i) => {
        return (
            <GameLogCard 
                player={player} 
                phase={phase} 
                pieceId={pieceId} 
                tileIndex={tileIndex}
                timestamp={eventTime}
                key={i} />)
    })

    return (
        <div className="game-log" style={gameLogStyle}>
            <div className="title dark">Game Log</div>
            <div className="game-log-list" style={gllStyle}>
                {gameLogCards}
            </div>
            <div className="stepper">Stepper Goes Here</div>
        </div>
    )
}

export default GameLog