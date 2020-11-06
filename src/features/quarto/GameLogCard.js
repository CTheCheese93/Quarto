import React from 'react'
import { useSelector } from 'react-redux'
import { HISTORY_MESSAGE_TEMPLATES, PHASE } from './CONSTANTS'
import { TimeAgo } from './Helpers'
import PieceImage from './PieceImage'
import { selectPlayers } from './quartoSlice'

const GameLogCard = ({player, phase, pieceId, eventTime}) => {
    const glcStyle = {
        marginTop: '10px',
        padding: '10px'
    }

    const messageStyle = {
        marginTop: '10px'
    }

    const pieceSectionStyle = {
        marginTop: '15px'
    }

    const players = useSelector(selectPlayers)
    const currentPlayer = players.find(p => p.role === player)

    return (
        <div className="log-card" style={glcStyle}>
            <div className="caption">
                {currentPlayer.name}
                <TimeAgo timestamp={eventTime} />
            </div>
            <div className="message" style={messageStyle}>
                {HISTORY_MESSAGE_TEMPLATES[phase](currentPlayer.name)}
            </div>
            {
                (pieceId === null || phase === PHASE.PLACE)
                ? ''
                : (
                    <div className="piece-section" style={pieceSectionStyle}>
                        <PieceImage pieceId={pieceId} />
                    </div>
                )
            }
        </div>
    )
}

export default GameLogCard