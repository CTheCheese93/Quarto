import React from 'react'
import { useSelector } from 'react-redux'
import GameBoardTile from './GameBoardTile'
import { selectCurrentBoardSnapshot } from './quartoSlice'

const GameBoard = () => {
    const gameBoardStyle = {
        display: 'flex',
        width: '100%'
    }

    const outlineStyle = {
        width: '100%',
        height: '100%',
        borderStyle: 'solid',
        borderRadius: '50%',
        padding: "17%",
    }

    const currentBoardSnapshot = useSelector(selectCurrentBoardSnapshot)
    const gameBoardTiles = currentBoardSnapshot.map((tileValue, i) => {
        return <GameBoardTile pieceId={tileValue} tileIndex={i} key={i} />
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