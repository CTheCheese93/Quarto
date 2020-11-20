import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import GameLogCard from './GameLogCard'
import { selectGameLog } from './quartoSlice'
import Stepper from './Stepper'

const setScrollToBottom = ({ element }) => {
    element.current.scrollTop = element.current.scrollHeight
}

const GameLog = () => {
    const gameLogListRef = useRef(null)

    const gameLogStyle = {
        padding: '10px',
        borderRadius: '15px 0px 0px 0px',
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
        display: 'flex',
        flexDirection: 'column',
    }

    const gameLog = useSelector(selectGameLog)

    const gameLogCards = gameLog.map(({player, phase, pieceId, tileIndex, eventTime}, i, arr) => {
        if (i === 0) {
            return (
                <GameLogCard 
                    player={player} 
                    phase={phase} 
                    pieceId={pieceId} 
                    tileIndex={tileIndex}
                    timestamp={eventTime}
                    isFirst={true}
                    key={i} />)
        } else {
            return (
                <GameLogCard 
                    player={player} 
                    phase={phase} 
                    pieceId={pieceId} 
                    tileIndex={tileIndex}
                    timestamp={eventTime}
                    isFirst={false}
                    key={i} />)
        }
        
    })

    useEffect(() => setScrollToBottom({ element: gameLogListRef }))

    return (
        <div className="game-log" style={gameLogStyle}>
            <div className="title dark" style={{textAlign: 'center', paddingBottom: '5px'}}>Game Log</div>
            <div className="game-log-list" style={gllStyle} ref={gameLogListRef}>
                {gameLogCards}
            </div>
            <Stepper />
        </div>
    )
}

export default GameLog