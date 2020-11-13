import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectGameStarted, playPressed, selectPlayerHasWon, selectCurrentPlayer, selectPlayers, selectScores, selectCurrentScoreKey } from './quartoSlice'
import { Form, Button, Modal } from 'react-bootstrap'
import { PLAYER_ROLE } from './CONSTANTS'

const LocalPlayForm = () => {
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
    const playerHasWon = useSelector(selectPlayerHasWon)
    const currentPlayer = useSelector(selectCurrentPlayer)
    const players = useSelector(selectPlayers)
    const scores = useSelector(selectScores)
    const currentScoreKey = useSelector(selectCurrentScoreKey)
    const player = players.find(p => p.role === currentPlayer)

    const _player1 = currentScoreKey !== "" ? players.find(p => p.role === PLAYER_ROLE.PLAYER_1) : ""
    const _player2 = currentScoreKey !== "" ? players.find(p => p.role === PLAYER_ROLE.PLAYER_2) : ""
    const _player1Score = currentScoreKey !== "" ? scores[currentScoreKey][_player1.name] : 0
    const _player2Score = currentScoreKey !== "" ? scores[currentScoreKey][_player2.name] : 0

    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')
    const [player1Score, setPlayer1Score] = useState(_player1Score)
    const [player2Score, setPlayer2Score] = useState(_player2Score)
    const [player2isFirst, setPlayer2isFirst] = useState(false)

    const handlePlayer1Change = (e) => setPlayer1(e.target.value)
    const handlePlayer2Change = (e) => setPlayer2(e.target.value)
    const handleisFirstChange = (e) => setPlayer2isFirst(e.target.checked)

    const onPlayClicked = (e) => {
        e.preventDefault()
        if (Boolean(player1) && Boolean(player2)) {
            dispatch(playPressed({player1, player2, player2isFirst}))
        }
    }

    const checkForScores = () => {
        if (!Boolean(player1) || !Boolean(player2))
            return
        
        const sortedPlayers = [player1, player2].sort()
        const scoreKey = `${sortedPlayers[0]}-${sortedPlayers[1]}`
        
        if (scoreKey in scores) {
            setPlayer1Score(scores[scoreKey][player1])
            setPlayer2Score(scores[scoreKey][player2])
        } else {
            setPlayer1Score(0)
            setPlayer2Score(0)
        }
    }

    return (
        <Modal show={!gameStarted} className="game-menu">
            <Modal.Header>
                <Modal.Title>{playerHasWon ? `${player.name} wins!` : 'Quarto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={scoreStyle}>
                    <div style={playerScoreStyle}>
                        <div className="player-name">
                            {player1}
                        </div>
                        <div className="player-score">
                            {player1Score}
                        </div>
                    </div>
                    <div style={playerScoreStyle}>
                        -
                    </div>
                    <div style={playerScoreStyle}>
                        <div className="player-name">
                            {player2}
                        </div>
                        <div className="player-score">
                            {player2Score}
                        </div>
                    </div>
                </div>
                <Form onSubmit={onPlayClicked}>
                    <Form.Group controlId="player-1">
                        <Form.Label>Player 1's Name</Form.Label>
                        <Form.Control type="text" placeholder="Player 1" name="player1" onChange={handlePlayer1Change} onBlur={checkForScores} value={player1} />
                    </Form.Group>
                    <Form.Group controlId="player-2">
                        <Form.Label>Player 2's Name</Form.Label>
                        <Form.Control type="text" placeholder="Player 2" name="player2" onChange={handlePlayer2Change} onBlur={checkForScores} value={player2} />
                    </Form.Group>
                    <Form.Group controlId="player-2-isFirst">
                        <Form.Check type="checkbox" label="Player 2 starts" name="player2isFirst" onChange={handleisFirstChange} value={player2isFirst} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Play {playerHasWon ? 'Again' : ''}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default LocalPlayForm