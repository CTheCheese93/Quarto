import { CORE, SHAPE, SIZE, COLOR } from "./CONSTANTS"

export const generatePieceDescription = ({size, core, color, shape}) => {
    return [size, core, color, shape].map(p => p[0] + p.slice(1).toLowerCase()).join('')
}

export const generatePieceProperties = (pieceId) => {
    const size = SIZE[pieceId[0]]
    const core = CORE[pieceId[1]]
    const color = COLOR[pieceId[2]]
    const shape = SHAPE[pieceId[3]]

    return {size, core, color, shape}
}

export const generatePieceDescriptionById = (pieceId) => {
    return generatePieceDescription(generatePieceProperties(pieceId))
}