import React from 'react'
import { useSelector } from 'react-redux'
import PieceCard from './PieceCard'
import { selectAvailablePieces } from './quartoSlice'


const AvailablePieces = () => {
    const availablePieces = useSelector(selectAvailablePieces)
    const pieces = availablePieces.map((piece) => {
        const {pieceId, size, color, core, shape} = piece

        return (
            <div key={pieceId}>
                <PieceCard pieceId={pieceId}
                    />
                <hr />
            </div>
        )
    })

    return (
        <div className="available-pieces">
            {pieces}
        </div>
    )
}

export default AvailablePieces