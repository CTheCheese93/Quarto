import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AvailablePieces from './AvailablePieces'
import GameBoard from './GameBoard'
import GamePhaseTracker from './GamePhaseTracker'
import LocalPlayForm from './LocalPlayForm'
import RoomRoster from './RoomRoster'


const GameHistory = () => {
    return (
        <div className="game-history">
            Game History Not Implemented!
        </div>
    )
}

const Quarto = () => {
    return (
        <Container fluid className="quarto">
            <Row>
                <Col>
                    <LocalPlayForm />
                </Col>
            </Row>
            <Row>
                <Col sm={3} className="left-panel">
                    <GamePhaseTracker />
                    <AvailablePieces />
                </Col>
                <Col sm={6} className="game-board-area">
                    <GameBoard />
                </Col>
                <Col sm={3} className="right-panel">
                    <RoomRoster />
                    <GameHistory />
                </Col>
            </Row>
        </Container>
    )
}

export default Quarto