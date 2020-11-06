import React from 'react'
import { useSelector } from 'react-redux'
import { HISTORY_MESSAGE_TEMPLATES, PHASE, PLAYER_ROLE } from './CONSTANTS'
import { TimeAgo } from './Helpers'
import PieceImage from './PieceImage'
import { selectPlayers } from './quartoSlice'

const GameLogCard = ({player, phase, pieceId, timestamp}) => {
    const players = useSelector(selectPlayers)
    const currentPlayer = players.find(p => p.role === player)
    
    const getPlayerBGColor = () => {
        return (currentPlayer.role === PLAYER_ROLE.PLAYER_1
                ? '#A5BEFF'
                : '#92E4A4')
    }

    const barStyle = {
        height: '2px',
        background: '#7C98B3',
        width: '30%',
        margin: '3%'
    }

    const glcStyle = {
        margin: '10px',
        padding: '10px',
        borderRadius: '5px',
        background: getPlayerBGColor(),
    }

    const messageStyle = {
        marginTop: '10px'
    }

    const pieceSectionStyle = {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const pieceFrameStyle = {
        width: '33%',
    }

    return (
        <div className="log-card" style={glcStyle}>
            <div className="caption">
                {currentPlayer.name}
                <TimeAgo timestamp={timestamp} />
            </div>
            <div className="message" style={messageStyle}>
                {HISTORY_MESSAGE_TEMPLATES[phase](currentPlayer.name)}
            </div>
            {
                (pieceId === null || phase === PHASE.PLACE)
                ? ''
                : (
                    <div className="piece-section" style={pieceSectionStyle}>
                        <div style={barStyle}></div>
                        <div style={pieceFrameStyle}>
                            <PieceImage pieceId={pieceId} />
                        </div>
                        <div style={barStyle}></div>
                    </div>
                )
            }
        </div>
    )
}

export default GameLogCard