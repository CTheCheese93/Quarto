import { createSlice, current } from '@reduxjs/toolkit'
import { PHASE, PLAYER_ROLE, SIZE, COLOR, SHAPE, CORE } from './CONSTANTS'

const initialState = {
    currentStep: 0,
    currentPhase: PHASE.PICK,
    currentPlayer: PLAYER_ROLE.PLAYER_1,
    gameStarted: false,
    players: [],
    availablePieces: [],
    gameLog: [],
    selectedPiece: null,
    currentBoardSnapshot: Array(16).fill(null),
    playerHasWon: false,
    gameHistory: []
}

const createPlayer = (name, role) => {
    return { name, role }
}

const generatePieces = () => {
    var sizeIndex, colorIndex, coreIndex, shapeIndex
    var pieces = []

    for (sizeIndex = 0; sizeIndex < 2; sizeIndex++) {
        for (colorIndex = 0; colorIndex < 2; colorIndex++){
            for (coreIndex = 0; coreIndex < 2; coreIndex++) {
                for (shapeIndex = 0; shapeIndex < 2; shapeIndex++) {
                    const piece = { 
                        pieceId: `${sizeIndex}${coreIndex}${colorIndex}${shapeIndex}`, 
                        size: SIZE[sizeIndex], 
                        color: COLOR[colorIndex], 
                        core: CORE[coreIndex], 
                        shape: SHAPE[shapeIndex]
                    }
                    pieces = pieces.concat(piece)
                }
            }
        }
    }

    return pieces
}

const gotoNextPhase = (state) => {
    const { currentStep, currentPhase, currentPlayer } = state
    var nextStep, nextPhase, nextPlayer

    if (currentPhase === PHASE.PICK) {
        nextPhase = PHASE.PLACE
        nextPlayer = currentPlayer === PLAYER_ROLE.PLAYER_1 ? PLAYER_ROLE.PLAYER_2 : PLAYER_ROLE.PLAYER_1
        nextStep = currentStep + 1
    } else if (currentPhase === PHASE.PLACE) {
        nextPhase = PHASE.PICK
        nextPlayer = currentPlayer
        nextStep = currentStep + 1
    } else {
        console.error("Something went wrong going to next phase")
    }

    return {nextStep, nextPhase, nextPlayer}
}

const winCheck = (boardState) => {
    const winPaths = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
        [0,4,8,12],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15],
        [0,5,10,15],
        [3,6,9,12]
    ]

    const winResults = winPaths.map((path) => {
        const piece1 = boardState[path[0]]
        const piece2 = boardState[path[1]]
        const piece3 = boardState[path[2]]
        const piece4 = boardState[path[3]]

        if (piece1 === null ||
            piece2 === null ||
            piece3 === null ||
            piece4 === null){
                return false
        }

        if (piece1 & piece2 & piece3 & piece4 === 0) {
            return false
        } else {
            return true
        }
    })

    const firstWinResultIndex = winResults.indexOf(true)

    if (firstWinResultIndex === -1) {
        return []
    } else {
        return winPaths[firstWinResultIndex]
    }
}

const createGameHistoryItem = (state) => {
    return {
        step: state.currentStep,
        phase: state.currentPhase,
        player: state.currentPlayer,
        availablePieces: state.availablePieces,
        selectedPiece: state.selectedPiece,
        currentBoardSnapshot: state.currentBoardSnapshot,
        gameLog: state.gameLog,
    }
}

const quartoSlice = createSlice({
    name: 'quarto',
    initialState,
    reducers: {
        playPressed: (state, action) => {
            const { player1, player2, player2isFirst } = action.payload

            const players = [player1, player2].map((name, index) => {
                return createPlayer(name, PLAYER_ROLE[index])
            })
            state.players = players
            player2isFirst 
            ? state.currentPlayer = PLAYER_ROLE.PLAYER_2 
            : state.currentPlayer = PLAYER_ROLE.PLAYER_1

            state.availablePieces = generatePieces()
            state.currentBoardSnapshot = Array(16).fill(null)
            state.currentPhase = PHASE.PICK
            state.playerHasWon = false

            state.gameStarted = true

            state.gameHistory.push(createGameHistoryItem(state))
        },
        pieceCardClicked: (state, action) => {
            if (state.gameStarted === false || state.currentPhase === PHASE.PLACE)
                return

            const { pieceId } = action.payload
            const { nextStep, nextPhase, nextPlayer }= gotoNextPhase(state)
            const player = state.currentPlayer
            const phase = state.currentPhase
            state.selectedPiece = pieceId

            state.gameLog.push({player, phase, pieceId, tileIndex: null, eventTime: new Date().toISOString()})

            
            state.currentStep = nextStep
            state.currentPhase = nextPhase
            state.currentPlayer = nextPlayer
            state.availablePieces = state.availablePieces.filter(piece => piece.pieceId !== pieceId)
            
            if (state.gameHistory.length >= state.currentStep + 1) {
                const newGameHistory = state.gameHistory.slice(0, state.currentStep)
                state.gameHistory = newGameHistory
                state.gameHistory.push(createGameHistoryItem(state))
            } else {
                state.gameHistory.push(createGameHistoryItem(state))
            }
        },
        newGamePressed: (state, action) => {
            console.log("New Game Pressed")
        },
        previousTurnPressed: (state) => {
            const previousStep = state.currentStep === 0 ? 0 : state.currentStep - 1

            if (previousStep === state.currentStep)
                return

            const gameHistoryState = state.gameHistory[previousStep]
            state.currentStep = gameHistoryState.step
            state.currentPhase = gameHistoryState.phase
            state.currentPlayer = gameHistoryState.player
            state.availablePieces = gameHistoryState.availablePieces
            state.selectedPiece = gameHistoryState.selectedPiece
            state.currentBoardSnapshot = gameHistoryState.currentBoardSnapshot
            state.gameLog = gameHistoryState.gameLog
        },
        nextTurnPressed: (state, action) => {
            const nextStep = state.currentStep + 1

            if (nextStep > state.gameHistory.length - 1)
                return

            const gameHistoryState = state.gameHistory[nextStep]
            state.currentStep = gameHistoryState.step
            state.currentPhase = gameHistoryState.phase
            state.currentPlayer = gameHistoryState.player
            state.availablePieces = gameHistoryState.availablePieces
            state.selectedPiece = gameHistoryState.selectedPiece
            state.currentBoardSnapshot = gameHistoryState.currentBoardSnapshot
            state.gameLog = gameHistoryState.gameLog
        },
        gameBoardTilePressed: (state, action) => {
            if (state.gameStarted === false || state.currentPhase === PHASE.PICK || state.selectedPiece === null)
                return

            const { pieceId, tileIndex } = action.payload
            const selectedPieceId = state.selectedPiece
            const { nextStep, nextPhase, nextPlayer }= gotoNextPhase(state)
            const player = state.currentPlayer
            const phase = state.currentPhase

            if (pieceId !== null)
                return
                
                
            state.currentBoardSnapshot[tileIndex] = selectedPieceId
            state.selectedPiece = null
            
            state.gameLog.push({player, phase, pieceId: selectedPieceId, tileIndex, eventTime: new Date().toISOString()})
            
            
            const winningPath = winCheck(state.currentBoardSnapshot)
            
            if (winningPath.length > 0) {
                state.playerHasWon = true
                state.gameStarted = false
            } else {
                state.currentStep = nextStep
                state.currentPhase = nextPhase
                state.currentPlayer = nextPlayer
            }
            
            if (state.gameHistory.length >= state.currentStep + 1) {
                const newGameHistory = state.gameHistory.slice(0, state.currentStep)
                state.gameHistory = newGameHistory
                state.gameHistory.push(createGameHistoryItem(state))
            } else {
                state.gameHistory.push(createGameHistoryItem(state))
            }
        }
    }
})

export const { playPressed, pieceCardClicked, gameBoardTilePressed, newGamePressed, previousTurnPressed, nextTurnPressed } = quartoSlice.actions

export const selectGameStarted = state => state.quarto.gameStarted
export const selectPlayers = state => state.quarto.players
export const selectAvailablePieces = state => state.quarto.availablePieces
export const selectCurrentPlayer = state => state.quarto.currentPlayer
export const selectCurrentPhase = state => state.quarto.currentPhase
export const selectSelectedPiece = state => state.quarto.selectedPiece
export const selectCurrentBoardSnapshot = state => state.quarto.currentBoardSnapshot
export const selectPlayerHasWon = state => state.quarto.playerHasWon
export const selectGameLog = state => state.quarto.gameLog

export default quartoSlice.reducer