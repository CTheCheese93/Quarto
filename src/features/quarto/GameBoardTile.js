import React from 'react'
import { useDispatch } from 'react-redux'
import PieceImage from './PieceImage'
import { gameBoardTilePressed } from './quartoSlice'

const GameBoardTile = ({pieceId, tileIndex}) => {
    const dispatch = useDispatch()
    const handleGameTilePressed = (e) => {
        dispatch(gameBoardTilePressed({pieceId, tileIndex}))
    }

    return (
        <div 
        className="game-board-tile"
        onClick={handleGameTilePressed}>
            {pieceId === null ? '' : (<PieceImage pieceId={pieceId} />) }
        </div>
    )
}

export default GameBoardTile 