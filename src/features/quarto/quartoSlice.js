import { createSlice, current } from '@reduxjs/toolkit'
import { PHASE, PLAYER_ROLE, SIZE, COLOR, SHAPE, CORE } from './CONSTANTS'
import { generateScoreKey } from './Helpers'

const initialState = {
    currentStep: 0,
    currentPhase: PHASE.PICK,
    currentPlayer: PLAYER_ROLE.PLAYER_1,
    gameStarted: false,
    activePlayers: [],
    alphaNoticeAccepted: false,
    availablePieces: [],
    gameLog: [],
    scores: {},
    selectedPiece: null,
    currentBoardSnapshot: Array(16).fill({ pieceId: null, pieceIdBase2: null }),
    playerHasWon: false,
    gameHistory: [],
    currentScoreKey: "",
    player2IsFirst: false,
    showRules: false,
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

    const byteToInt = (byte) => {
        let result = 0
        for (let i = 0; i < byte.length; i++) {
          const expo = byte.length - 1 - i
          result += byte[i] * (2 ** expo)
        }
        return result
    }

    const invertBitsAsBase2 = (byte) => {
        let newByte = ""

        for (let b in byte) {
            newByte += byte[b] === '0' ? '1' : '0'
        }

        return byteToInt(newByte)
    }

    const comparePieces = (pieceArray) => {
        let check = pieceArray[0] & pieceArray[1] & pieceArray[2] & pieceArray[3]
        console.log(check, pieceArray)
        if (check === 0) {
            return false
        } else {
            return true
        }
    }

    const winResults = winPaths.map((path) => {
        const piece1 = boardState[path[0]]
        const piece2 = boardState[path[1]]
        const piece3 = boardState[path[2]]
        const piece4 = boardState[path[3]]

        if (piece1.pieceIdBase2 === null ||
            piece2.pieceIdBase2 === null ||
            piece3.pieceIdBase2 === null ||
            piece4.pieceIdBase2 === null){
                return false
        }
        const pieces = [piece1, piece2, piece3, piece4].map((p) => {
            console.log(p.pieceId, byteToInt(p.pieceId))
            return byteToInt(p.pieceId)
        })

        const invertedPieces = [piece1, piece2, piece3, piece4].map((p) => {
            return invertBitsAsBase2(p.pieceId)
        })

        let check1 = comparePieces(pieces)
        let check2 = comparePieces(invertedPieces)

        if (check1 || check2) {
            return true
        } else {
            return false
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
            const { player1Name, player2Name, player2IsFirst } = action.payload
            const scoreKey = generateScoreKey(player1Name, player2Name)

            if (!(scoreKey in state.scores)){    
                state.scores[scoreKey] = {
                    [player1Name]: 0,
                    [player2Name]: 0
                }
            }
            
            state.currentScoreKey = scoreKey

            const players = [player1Name, player2Name].map((name, index) => {
                return {name, role: PLAYER_ROLE[index]}
            })

            state.activePlayers = players

            state.currentPlayer = player2IsFirst ? PLAYER_ROLE.PLAYER_2 : PLAYER_ROLE.PLAYER_1
            state.player2IsFirst = player2IsFirst
            state.availablePieces = generatePieces()
            state.currentBoardSnapshot = Array(16).fill({ pieceId: null, pieceIdBase2: null })
            state.currentStep = 0
            state.gameHistory = []
            state.gameLog = []
            state.currentPhase = PHASE.PICK
            state.playerHasWon = false

            state.gameStarted = true

            state.gameHistory.push(createGameHistoryItem(state))
        },
        toggleShowRules: (state) => {
            state.showRules = !state.showRules
        },
        alphaNoticeWasAccepted: (state) => {
            state.alphaNoticeAccepted = true
        },
        pieceCardClicked: (state, action) => {
            if (state.gameStarted === false || state.currentPhase === PHASE.PLACE)
                return

            const { pieceId, pieceIdBase2 } = action.payload
            const { nextStep, nextPhase, nextPlayer }= gotoNextPhase(state)
            const player = state.currentPlayer
            const phase = state.currentPhase
            state.selectedPiece = {pieceId, pieceIdBase2}

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
            const player = state.activePlayers.find(p => p.role === state.currentPlayer)
            const phase = state.currentPhase

            if (pieceId !== null)
                return
                
                
            state.currentBoardSnapshot[tileIndex] = selectedPieceId
            state.selectedPiece = null
            
            state.gameLog.push({
                player: player.role,
                phase,
                pieceId: selectedPieceId,
                tileIndex,
                eventTime: new Date().toISOString()
            })
            
            
            const winningPath = winCheck(state.currentBoardSnapshot)
            
            if (winningPath.length > 0) {
                state.scores[state.currentScoreKey][player.name] += 1

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

export const { playPressed, toggleShowRules, alphaNoticeWasAccepted, pieceCardClicked, gameBoardTilePressed, newGamePressed, previousTurnPressed, nextTurnPressed } = quartoSlice.actions

export const selectGameStarted = state => state.quarto.gameStarted
export const selectPlayers = state => state.quarto.activePlayers
export const selectAvailablePieces = state => state.quarto.availablePieces
export const selectCurrentPlayer = state => state.quarto.currentPlayer
export const selectCurrentPhase = state => state.quarto.currentPhase
export const selectSelectedPiece = state => state.quarto.selectedPiece
export const selectCurrentBoardSnapshot = state => state.quarto.currentBoardSnapshot
export const selectPlayerHasWon = state => state.quarto.playerHasWon
export const selectGameLog = state => state.quarto.gameLog
export const selectScores = state => state.quarto.scores
export const selectCurrentScoreKey = state => state.quarto.currentScoreKey
export const selectPlayer2IsFirst = state => state.quarto.player2IsFirst
export const selectAlphaNoticeAccepted = state => state.quarto.alphaNoticeAccepted
export const selectShowRules = state => state.quarto.showRules

export default quartoSlice.reducer