import React from 'react'
import { useDispatch } from 'react-redux'
import PieceImage from './PieceImage'
import { gameBoardTilePressed } from './quartoSlice'

const GameBoardTile = ({pieceId, tileIndex}) => {
    const emptyPiece = {
        background: 'blue',
        width: '60px',
        height: '60px'
    }

    const pieceStyle = {
        position: 'absolute',
        borderStyle: 'solid',
    }

    const gbtStyle = {
        width: '23%',
        background: 'red',
        margin: '1%',
        paddingBottom: '23%',
        display: 'inline-block',
        position: 'relative',
    }

    const dispatch = useDispatch()
    const handleGameTilePressed = (e) => {
        dispatch(gameBoardTilePressed({pieceId, tileIndex}))
    }

    return (
        <div 
        className="game-board-tile" style={gbtStyle}
        onClick={handleGameTilePressed}>
            <div style={pieceStyle}>
                {
                    pieceId === null
                    ? ''
                    : (<PieceImage pieceId={pieceId} />)
                }
            </div>
        </div>
    )
}

export default GameBoardTile 