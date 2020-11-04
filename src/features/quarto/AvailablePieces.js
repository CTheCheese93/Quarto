import React from 'react'
import { useSelector } from 'react-redux'
import PieceCard from './PieceCard'
import { selectAvailablePieces } from './quartoSlice'


const AvailablePieces = () => {
    const pieceListStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        overflowY: 'scroll',
    }

    const availablePieces = useSelector(selectAvailablePieces)
    const pieces = availablePieces.map((piece) => {
        const {pieceId, size, color, core, shape} = piece

        return (
            <PieceCard pieceId={pieceId} key={pieceId} />
        )
    })

    return (
        <div className="available-pieces" style={{maxHeight: '100%'}}>
            <div className="title light">Available Pieces</div>
            <div className="piece-list" style={pieceListStyle}>
                {pieces}
            </div>
        </div>
    )
}

export default AvailablePieces