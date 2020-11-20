import React from 'react'
import { useSelector } from 'react-redux'
import { PLAYER_ROLE } from './CONSTANTS'
import { selectPlayers } from './quartoSlice'

const RoomRoster = () => {
    const roomRosterStyle = {
        padding: '15px',
        background: '#7C98B3',
        borderRadius: '0px 0px 0px 15px'
    }

    const players = useSelector(selectPlayers)

    const playerList = players.map((player) => {
        const playerCardStyle = {
            padding: '5px',
            paddingLeft: '10px',
            borderRadius: '0px 15px 0px 15px',
            background: '#fff',
            marginTop: '10px'
        }

        const role = player.role === PLAYER_ROLE.PLAYER_1 ? "Player 1" : "Player 2"

        return (
            <div className="player-card" style={playerCardStyle} key={`${player.name}-${player.role}`}>
                <div className="player-name">
                    {player.name}
                </div>
                <div className="player-role">
                    {role}
                </div>
            </div>
        )
    })

    return (
        <div className="room-roster" style={roomRosterStyle}>
            <div className="title light">Local Play</div>
            <div>
                {playerList}
            </div>
        </div>
    )
}

export default RoomRoster