import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectGameStarted, playPressed, selectPlayerHasWon, selectCurrentPlayer, selectPlayers } from './quartoSlice'
import { Form, Button, Modal } from 'react-bootstrap'

const LocalPlayForm = () => {
    const dispatch = useDispatch()
    const gameStarted = useSelector(selectGameStarted)
    const playerHasWon = useSelector(selectPlayerHasWon)
    const currentPlayer = useSelector(selectCurrentPlayer)
    const players = useSelector(selectPlayers)
    const player = players.find(p => p.role === currentPlayer)

    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')
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

    return (
        <Modal show={!gameStarted} className="game-menu">
            <Modal.Header>
                <Modal.Title>{playerHasWon ? `${player.name} wins!` : 'Quarto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onPlayClicked}>
                    <Form.Group controlId="player-1">
                        <Form.Label>Player 1's Name</Form.Label>
                        <Form.Control type="text" placeholder="Player 1" name="player1" onChange={handlePlayer1Change} value={player1} />
                    </Form.Group>
                    <Form.Group controlId="player-2">
                        <Form.Label>Player 2's Name</Form.Label>
                        <Form.Control type="text" placeholder="Player 2" name="player2" onChange={handlePlayer2Change} value={player2} />
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