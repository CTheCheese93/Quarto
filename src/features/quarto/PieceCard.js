import React from 'react'
import { useDispatch } from 'react-redux'
import { pieceCardClicked } from './quartoSlice'


const PieceCard = ({pieceId, size, color, core, shape}) => {
    const dispatch = useDispatch()
    const handlePieceCardClicked = (e) => {
        dispatch(pieceCardClicked({pieceId}))
    }

    return (
        <div className="piece-card" onClick={handlePieceCardClicked}>
            <b>{pieceId}</b><br />
            Size: {size}<br />
            Color: {color}<br />
            Core: {core}<br />
            Shape: {shape}
        </div>
    )
}

export default PieceCard