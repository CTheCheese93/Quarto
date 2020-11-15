import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PLAYER_ROLE } from './CONSTANTS'
import { newGamePressed, nextTurnPressed, previousTurnPressed, selectPlayers, selectPlayer2IsFirst, playPressed } from './quartoSlice'


const Stepper = () => {
    const dispatch = useDispatch()
    const players = useSelector(selectPlayers)
    const player2IsFirst = useSelector(selectPlayer2IsFirst)
    const player1 = players.find((p) => p.role === PLAYER_ROLE.PLAYER_1)
    const player2 = players.find((p) => p.role === PLAYER_ROLE.PLAYER_2)

    const stepperStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '10px',
    }

    const buttonStyle = {
        width: '29%',
        borderRadius: '300px',
        backgroundColor: '#536B78',
    }

    const handleNewGamePressed = (e) => {
        dispatch(playPressed({player1: player1.name, player2: player2.name, player2isFirst: player2IsFirst }))
    }

    const handlePrevTurnPressed = (e) => {
        dispatch(previousTurnPressed())
    }

    const handleNextTurnPressed = (e) => {
        dispatch(nextTurnPressed())
    }


    return (
        <div className="stepper" style={stepperStyle}>
            <Button style={buttonStyle} onClick={handleNewGamePressed}><i className="fas fa-plus"></i></Button>
            <Button style={buttonStyle} onClick={handlePrevTurnPressed}><i className="fas fa-angle-left"></i></Button>
            <Button style={buttonStyle} onClick={handleNextTurnPressed}><i className="fas fa-angle-right"></i></Button>
        </div>
    )
}

export default Stepper