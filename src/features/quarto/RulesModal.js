import React from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectShowRules, toggleShowRules } from './quartoSlice'

const RulesModal = () => {
    const dispatch = useDispatch()
    const showRules = useSelector(selectShowRules)

    const handleHide = (e) => { dispatch(toggleShowRules()) }

    return (
        <Modal show={showRules} onHide={handleHide}>
            <Modal.Header closeButton={true}>
                <Modal.Title>Rules</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Components</h3>
                <ul>
                    <li>Board with 16 circles</li>
                    <li>
                        16 pieces with 4 characteristics:
                        <ul>
                            <li>Color</li>
                            <li>Shape</li>
                            <li>Size</li>
                            <li>Core (Solid or Hollow)</li>
                        </ul>
                    </li>
                </ul>
                <h3>Objective</h3>
                <ul>
                    <li>    
                        Establish a line of four pieces with at least one common characteristic on the board.
                    </li>
                </ul>
                <h3>Game Play</h3>
                <ul>
                    <li>    
                        First player (P1) selects one of the 16 pieces, giving it to the opponent (P2)
                    </li>
                    <li>    
                        Opponent (P2) places the piece on any open space on the board
                    </li>
                    <li>    
                        Opponent (P2) selects one of the availabe pieces, giving it to the first player (P1)
                    </li>
                    <li>    
                        First player (P1) places the piece on any open space on the board
                    </li>
                    <li>    
                        Repeat until someone wins or a tie
                    </li>
                </ul>
            </Modal.Body>
        </Modal>
    )
}

export default RulesModal