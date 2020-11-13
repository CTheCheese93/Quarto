import { findCoordinates } from "./Helpers"

const PLAYER_ROLE_OPTIONS = {
    0: 'PLAYER_1',
    1: 'PLAYER_2',
    2: 'GUEST'
}

const PHASE_OPTIONS = {
    0: 'PICK', // Player is picking a piece
    1: 'PLACE', // Player is placing a piece
}

const COLOR_OPTIONS = {
    0: 'COLOR1',
    1: 'COLOR2'
}

const SIZE_OPTIONS = {
    0: 'SMALL',
    1: 'BIG'
}

const CORE_OPTIONS = {
    0: 'HOLLOW',
    1: 'SOLID'
}

const SHAPE_OPTIONS = {
    0: 'SHAPE1',
    1: 'SHAPE2'
}

export const PHASE_TEMPLATES = {
    PICK: (player) => `${player} is picking a piece`,
    PLACE: (player) => `${player} is placing the piece`
}

export const HISTORY_MESSAGE_TEMPLATES = {
    PICK: (player) => `${player} has picked a piece:`,
    PLACE: (player, boardIndex) => {
        let coords = findCoordinates(boardIndex, 4, true)
        return `${player} has placed piece at (${coords.x}, ${coords.y})`
    }
}

export const PHASE = {
    0: PHASE_OPTIONS[0],
    1: PHASE_OPTIONS[1],
    PICK: PHASE_OPTIONS[0],
    PLACE: PHASE_OPTIONS[1]
}

export const COLOR = {
    0: COLOR_OPTIONS[0],
    1: COLOR_OPTIONS[1],
    COLOR1: COLOR_OPTIONS[0],
    COLOR2: COLOR_OPTIONS[1]
}

export const SIZE = {
    0: SIZE_OPTIONS[0],
    1: SIZE_OPTIONS[1],
    SMALL: SIZE_OPTIONS[0],
    BIG: SIZE_OPTIONS[1]
}

export const CORE = {
    0: CORE_OPTIONS[0],
    1: CORE_OPTIONS[1],
    HOLLOW: CORE_OPTIONS[0],
    SOLID: CORE_OPTIONS[1]
}

export const SHAPE = {
    0: SHAPE_OPTIONS[0],
    1: SHAPE_OPTIONS[1],
    SHAPE1: SHAPE_OPTIONS[0],
    SHAPE2: SHAPE_OPTIONS[1]
}

export const PLAYER_ROLE = {
    0: PLAYER_ROLE_OPTIONS[0],
    1: PLAYER_ROLE_OPTIONS[1],
    2: PLAYER_ROLE_OPTIONS[2],
    PLAYER_1: PLAYER_ROLE_OPTIONS[0],
    PLAYER_2: PLAYER_ROLE_OPTIONS[1],
    GUEST: PLAYER_ROLE_OPTIONS[2]
}