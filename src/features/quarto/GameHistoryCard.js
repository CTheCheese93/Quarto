import React from 'react'
import { useSelector } from 'react-redux'
import { HISTORY_MESSAGE_TEMPLATES, PHASE } from './CONSTANTS'
import { TimeAgo } from './Helpers'
import PieceImage from './PieceImage'
import { selectPlayers } from './quartoSlice'

const GameHistoryCard = ({player, phase, pieceId, eventTime}) => {
    const players = useSelector(selectPlayers)
    const currentPlayer = players.find(p => p.role === player)

    return (
        <div className="history-card">
            <div className="history-card-title">
                <TimeAgo timestamp={eventTime} />
            </div>
            <div className="message">
                {HISTORY_MESSAGE_TEMPLATES[phase](currentPlayer.name)}
            </div>
            {
                (pieceId === null || phase === PHASE.PLACE)
                ? ''
                : (
                    <div className="piece-section">
                        <PieceImage pieceId={pieceId} />
                    </div>
                )
            }
        </div>
    )
}

export default GameHistoryCard