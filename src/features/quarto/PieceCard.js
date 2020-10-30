import React from 'react'
import { useDispatch } from 'react-redux'
import PieceImage from './PieceImage'
import { pieceCardClicked } from './quartoSlice'


const PieceCard = ({pieceId}) => {
    const dispatch = useDispatch()
    const handlePieceCardClicked = (e) => {
        dispatch(pieceCardClicked({pieceId}))
    }

    return (
        <div className="piece-card" onClick={handlePieceCardClicked}>
            <PieceImage pieceId={pieceId} />
        </div>
    )
}

export default PieceCard