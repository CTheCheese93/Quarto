import React from 'react'
import { generatePieceDescription, generatePieceDescriptionById } from './Helpers'

const PieceImage = ({pieceId}) => {
    const pieceFileName = generatePieceDescriptionById(pieceId)
    return (<img src={`${process.env.PUBLIC_URL}/assets/pieces/${pieceFileName}.svg`} />)
}

export default PieceImage