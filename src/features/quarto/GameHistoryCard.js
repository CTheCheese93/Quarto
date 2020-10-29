import React from 'react'
import { PLAYER_ROLE } from './CONSTANTS'

const GameHistoryCard = ({player, phase, pieceId = null}) => {
    return (
        <div className="history-card">
            <div className="history-card-title">
                <span className="player-name">{player}</span>
                <span className="event-time">{eventTime}</span>
            </div>
            <div className="message">
                {HISTORY_MESSAGE_TEMPLATES[phase](player)}
            </div>
            {
                pieceId === null
                ? ''
                : (
                    <div className="piece-section">
                        {pieceId}
                    </div>
                )
            }
        </div>
    )
}

export default GameHistoryCard