import React from 'react'
import { useSelector } from 'react-redux'
import { selectPlayers } from './quartoSlice'

const RoomRoster = () => {
    const players = useSelector(selectPlayers)
    const playerList = players.map((player) => {
        return (
            <div className="player-name" key={`${player.name}-${player.role}`}>
                {player.name} <span>({player.role})</span>
            </div>
        )
    })

    return (
        <div className="room-roster">
            {playerList}
        </div>
    )
}

export default RoomRoster