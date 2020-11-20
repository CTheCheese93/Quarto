import React from 'react'
import { useDispatch } from 'react-redux'
import PieceImage from './PieceImage'
import { pieceCardClicked } from './quartoSlice'


const PieceCard = ({pieceId, pieceIdBase2}) => {
    const barStyle = {
        height: '1px',
        background: '#7C98B3',
        width: '10%'
    }

    const pieceCardStyle = {
        width: '125px',
        height: '125px',
        borderRadius: '0px 15px 0px 15px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
        minHeight: 'min-content',
        justifyContent: 'space-around',
    }

    const pieceImageStyle = {
        width: '60%'
    }

    const dispatch = useDispatch()
    const handlePieceCardClicked = (e) => {
        dispatch(pieceCardClicked({pieceId, pieceIdBase2}))
    }

    return (
        <div className="piece-card" style={pieceCardStyle} onClick={handlePieceCardClicked}>
            <div style={barStyle} id={pieceId} />
            <div style={pieceImageStyle}>
                <PieceImage pieceId={pieceId} />
            </div>
            <div style={barStyle} />
        </div>
    )
}

export default PieceCard