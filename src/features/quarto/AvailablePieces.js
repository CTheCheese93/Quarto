import React from 'react'
import { useSelector } from 'react-redux'
import PieceCard from './PieceCard'
import { selectAvailablePieces } from './quartoSlice'


const AvailablePieces = () => {
    const availablePiecesStyle = {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: '10px',
        marginTop: '10px',
        background: '#7C98B3',
        borderRadius: '0px 15px 0px 0px',
    }
    
    const pieceListStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        flex: '1',
        justifyContent: 'space-around',
        overflow: 'auto',
    }

    const availablePieces = useSelector(selectAvailablePieces)
    const pieces = availablePieces.map((piece) => {
        const {pieceId} = piece

        return (
            <PieceCard pieceId={pieceId} key={pieceId} />
        )
    })

    return (
        <div className="available-pieces" style={availablePiecesStyle}>
            <div className="title light">Available Pieces</div>
            <div className="piece-list" style={pieceListStyle}>
                {pieces}
            </div>
        </div>
    )
}

export default AvailablePieces