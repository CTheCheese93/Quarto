import { CORE, SHAPE, SIZE, COLOR } from "./CONSTANTS"
import { parseISO, formatDistanceToNow } from 'date-fns'
import { findByLabelText } from "@testing-library/react"

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

export const generateScoreKey = (player1Name, player2Name) => {
    const sortedPlayers = [player1Name, player2Name].sort()
    return `${sortedPlayers[0]}-${sortedPlayers[1]}`
}

export const TimeAgo = ({timestamp}) => {
    let timeAgo = ''

    if (Boolean(timestamp)) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp} style={{float: 'right'}}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}

const findY = (i, d) => {
    return Math.floor(i/d)
}

const findX = (i, d) => {
    return (i - (d * findY(i, d)))
}

export const findCoordinates = (index, boardSize, startAtOne = false) => {
    let offset = startAtOne === false ? 0 : 1
    return {
        x: findX(index, boardSize) + offset,
        y: findY(index, boardSize) + offset
    }
}