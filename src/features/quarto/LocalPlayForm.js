import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectGameStarted, playPressed, selectPlayerHasWon, selectCurrentPlayer, selectPlayers, selectScores, selectCurrentScoreKey, selectAlphaNoticeAccepted } from './quartoSlice'
import { Form, Button, Modal, Alert } from 'react-bootstrap'
import { PLAYER_ROLE } from './CONSTANTS'

const LocalPlayForm = () => {
    const horizontalBarStyle = {
        height: '1px',
        marginTop: '5px',
        marginBottom: '5px',
        width: '30%',
        borderRadius: '50%',
        backgroundColor: '#000'
    }

    const scoreStyle = {
        display: 'flex',
        margin: '10px 0',
    }

    const playerScoreStyle = {
        flex: '1 33%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    }

    const dispatch = useDispatch()
    const gameStarted = useSelector(selectGameStarted)
    const alphaNoticeAccepted = useSelector(selectAlphaNoticeAccepted)
    const playerHasWon = useSelector(selectPlayerHasWon)
    const currentPlayer = useSelector(selectCurrentPlayer)
    const players = useSelector(selectPlayers)
    const scores = useSelector(selectScores)
    const player = players.find(p => p.role === currentPlayer)

    const [player1Name, setPlayer1Name] = useState('')
    const [player2Name, setPlayer2Name] = useState('')
    const [player2IsFirst, setPlayer2IsFirst] = useState(false)

    const [rulesHidden, setRulesHidden] = useState(true)

    const handlePlayer1Change = (e) => setPlayer1Name(e.target.value)
    const handlePlayer2Change = (e) => setPlayer2Name(e.target.value)
    const handleisFirstChange = (e) => setPlayer2IsFirst(e.target.checked)
    
    const handleRulesToggle = (e) => setRulesHidden(!rulesHidden)

    const onPlayClicked = (e) => {
        e.preventDefault()
        if (Boolean(player1Name) && Boolean(player2Name)) {
            dispatch(playPressed({player1Name, player2Name, player2IsFirst}))
        }
    }
    
    const checkForScores = () => {
        if (!Boolean(player1Name) || !Boolean(player2Name))
        return [0, 0]
        
        const sortedPlayers = [player1Name, player2Name].sort()
        const scoreKey = `${sortedPlayers[0]}-${sortedPlayers[1]}`
        
        if (scoreKey in scores) {
            return [scores[scoreKey][player1Name], scores[scoreKey][player2Name]]
        } else {
            return [0, 0]
        }
    }
    
    const [player1Score, player2Score] = checkForScores()

    return (
        <Modal show={(gameStarted === false && alphaNoticeAccepted === true) ? true : false} className="game-menu">
            <Modal.Header style={{justifyContent: 'center'}}>
                <Modal.Title>Let's Play Quarto!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    playerHasWon === true
                    ? (
                        <Alert 
                            variant={'info'}
                            style={{textAlign: 'center'}}>
                            <div>
                                {player.name} Wins!
                            </div>
                        </Alert>
                    )
                    : ''
                }
                <div style={scoreStyle}>
                    <div style={playerScoreStyle}>
                        <div className="player-name">
                            {player1Name === "" ? 'Player 1' : player1Name}
                        </div>
                        <div style={horizontalBarStyle}></div>
                        <div className="player-score">
                            {player1Score}
                        </div>
                    </div>
                    <div style={playerScoreStyle}>
                        -
                    </div>
                    <div style={playerScoreStyle}>
                        <div className="player-name">
                            {player2Name === "" ? 'Player 2' : player2Name}
                        </div>
                        <div style={horizontalBarStyle}></div>
                        <div className="player-score">
                            {player2Score}
                        </div>
                    </div>
                </div>
                <Form onSubmit={onPlayClicked}>
                    <Form.Group controlId="player-1">
                        <Form.Label>Player 1's Name</Form.Label>
                        <Form.Control type="text" placeholder="Player 1" name="player1" onChange={handlePlayer1Change} onBlur={checkForScores} value={player1Name} />
                    </Form.Group>
                    <Form.Group controlId="player-2">
                        <Form.Label>Player 2's Name</Form.Label>
                        <Form.Control type="text" placeholder="Player 2" name="player2" onChange={handlePlayer2Change} onBlur={checkForScores} value={player2Name} />
                    </Form.Group>
                    <hr />
                    <Form.Group controlId="player-2-isFirst" className="d-flex justify-content-center">
                        <Form.Check type="checkbox" label="Player 2 starts" name="player2isFirst" onChange={handleisFirstChange} value={player2IsFirst} />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="outline-primary" onClick={handleRulesToggle}>
                            {rulesHidden ? 'Show' : 'Hide'} Rules
                        </Button>
                        <Button variant="primary" type="submit" disabled={(player1Name !== "" && player2Name !== "") ? false : true } style={{marginLeft: '10px'}}>
                            Play {playerHasWon ? 'Again' : 'Now!'}
                        </Button>
                    </div>
                </Form>
                <div className={rulesHidden ? 'hidden' : ''}>
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
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default LocalPlayForm