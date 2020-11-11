import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { newGamePressed, nextTurnPressed, previousTurnPressed } from './quartoSlice'


const Stepper = () => {
    const dispatch = useDispatch()

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
        console.log("Hello!")
        dispatch(newGamePressed())
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