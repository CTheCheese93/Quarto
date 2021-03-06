import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AlphaNoticeForm from './AlphaNoticeForm'
import AvailablePieces from './AvailablePieces'
import GameBoard from './GameBoard'
import GameLog from './GameLog'
import GamePhaseTracker from './GamePhaseTracker'
import LocalPlayForm from './LocalPlayForm'
import RoomRoster from './RoomRoster'
import RulesModal from './RulesModal'

const Quarto = () => {
    const leftPanelStyle = {
        paddingLeft: '0px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    }

    const rightPanelStyle = {
        paddingRight: '0px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    }

    const gameBoardAreaStyle = {
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <Container fluid className="quarto">
            <Row>
                <Col>
                    <LocalPlayForm />
                    <AlphaNoticeForm />
                    <RulesModal />
                </Col>
            </Row>
            <Row>
                <Col sm={3} className="left-panel" style={leftPanelStyle}>
                    <GamePhaseTracker />
                    <AvailablePieces />
                </Col>
                <Col sm={6} className="game-board-area" style={gameBoardAreaStyle}>
                    <GameBoard />
                </Col>
                <Col sm={3} className="right-panel" style={rightPanelStyle}>
                    <RoomRoster />
                    <GameLog />
                </Col>
            </Row>
        </Container>
    )
}

export default Quarto