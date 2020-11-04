import React from 'react'
import { useDispatch } from 'react-redux'
import PieceImage from './PieceImage'
import { pieceCardClicked } from './quartoSlice'


const PieceCard = ({pieceId}) => {
    const barStyle = {
        height: '3px',
        background: '#000',
        width: '12.5px'
    }

    const pieceCardStyle = {
        width: '125px',
        height: '125px',
        borderRadius: '15px 0px 15px 0px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
        minHeight: 'min-content',
    }

    const dispatch = useDispatch()
    const handlePieceCardClicked = (e) => {
        dispatch(pieceCardClicked({pieceId}))
    }

    return (
        // <div style={areaStyle}>
            <div className="piece-card" style={pieceCardStyle} onClick={handlePieceCardClicked}>
                <div style={barStyle} />
                <PieceImage pieceId={pieceId} />
                <div style={barStyle} />
            </div>
        // </div>
    )
}

export default PieceCard