import React from 'react'
import { TimeAgo } from './Helpers'

const GameHistoryCard = ({player, phase, pieceId, eventTime}) => {
    return (
        <div className="history-card">
            <div className="history-card-title">
                <span className="player-name">{player}</span>
                <TimeAgo timestamp={eventTime} />
            </div>
            <div className="message">
                {/* {HISTORY_MESSAGE_TEMPLATES[phase](player)} */}
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