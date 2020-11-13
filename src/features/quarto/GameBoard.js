import React from 'react'
import { useSelector } from 'react-redux'
import GameBoardTile from './GameBoardTile'
import { selectCurrentBoardSnapshot } from './quartoSlice'

const GameBoard = () => {
    const gameBoardStyle = {
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
        padding: '3%',
        background: '#7C98B3',
        borderRadius: '2%',
    }

    const outlineStyle = {
        width: '100%',
        height: '100%',
        borderStyle: 'solid',
        borderWidth: '5px',
        borderRadius: '50%',
        padding: "14%",
        borderColor: '#CEE5F2',
        rotate: '45deg',
    }

    const currentBoardSnapshot = useSelector(selectCurrentBoardSnapshot)
    const gameBoardTiles = currentBoardSnapshot.map(({pieceId, pieceIdBase2}, i) => {
        return <GameBoardTile pieceId={pieceId} pieceIdBase2={pieceIdBase2} tileIndex={i} key={i} />
    })

    return (
        <div className="game-board" style={gameBoardStyle}>
            <div className="outline" style={outlineStyle}>
                {gameBoardTiles}
            </div>
        </div>
    )
}

export default GameBoard