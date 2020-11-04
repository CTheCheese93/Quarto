import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AvailablePieces from './AvailablePieces'
import GameBoard from './GameBoard'
import GameHistory from './GameHistory'
import GamePhaseTracker from './GamePhaseTracker'
import LocalPlayForm from './LocalPlayForm'
import RoomRoster from './RoomRoster'

const Quarto = () => {
    const leftPanelStyle = {
        paddingLeft: '0px',
        height: '100vh',
    }

    const rightPanelStyle = {
        paddingRight: '0px',
        height: '100vh',
    }

    return (
        <Container fluid className="quarto">
            <Row>
                <Col>
                    <LocalPlayForm />
                </Col>
            </Row>
            <Row>
                <Col sm={3} style={leftPanelStyle}>
                    <GamePhaseTracker />
                    <AvailablePieces />
                </Col>
                <Col sm={6} className="game-board-area">
                    <GameBoard />
                </Col>
                <Col sm={3} style={rightPanelStyle}>
                    <RoomRoster />
                    <GameHistory />
                </Col>
            </Row>
        </Container>
    )
}

export default Quarto