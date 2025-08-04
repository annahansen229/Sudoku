import Board, { Location } from "@/domain/Board"

type GameState = {
    selectedCell: Location | null
    noteMode: boolean
    setupMode: boolean
    board: Board
}