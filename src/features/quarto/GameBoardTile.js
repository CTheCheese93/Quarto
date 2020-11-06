import React from 'react'
import { useDispatch } from 'react-redux'
import PieceImage from './PieceImage'
import { gameBoardTilePressed } from './quartoSlice'

const GameBoardTile = ({pieceId, tileIndex}) => {
    const pieceStyle = {
        position: 'absolute',
        borderStyle: 'none',
        borderRadius: '50%',
        width: '100%',
    }
 
    const pieceImageFrame = {
        padding: '20%',
    }

    const gbtStyle = {
        width: '23%',
        background: '#CEE5F2',
        margin: '1%',
        paddingBottom: '23%',
        display: 'inline-block',
        position: 'relative',
        rotate: '-45deg',
        borderRadius: '50%',
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
                    : (
                        <div style={pieceImageFrame}>
                            <PieceImage pieceId={pieceId} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default GameBoardTile 