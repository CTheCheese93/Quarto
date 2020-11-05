import React from 'react'
import { generatePieceDescription, generatePieceDescriptionById } from './Helpers'

const PieceImage = ({pieceId}) => {
    const pieceImageStyle = {
        width: '100%',
        height: '100%'
    }

    const pieceFileName = generatePieceDescriptionById(pieceId)
    return (<img src={`${process.env.PUBLIC_URL}/assets/pieces/${pieceFileName}.svg`} style={pieceImageStyle} />)
}

export default PieceImage