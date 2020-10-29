import React from 'react'
import { useSelector } from 'react-redux'
import GameBoardTile from './GameBoardTile'
import { selectCurrentBoardSnapshot } from './quartoSlice'

const GameBoard = () => {
    const currentBoardSnapshot = useSelector(selectCurrentBoardSnapshot)
    const gameBoardTiles = currentBoardSnapshot.map((tileValue, i) => {
        return <GameBoardTile pieceId={tileValue} tileIndex={i} key={i} />
    })

    return (
        <div className="game-board">
            {gameBoardTiles}
        </div>
    )
}

export default GameBoard