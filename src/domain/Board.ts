import { Digit, MaybeDigit } from "@/types"
import Cell from "./Cell"


/**
 * A Column is a collection of 9 Cells
 */
type Column = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]

/**
 * A Board is 9 rows of 9 columns
 */
type Rows = [Column, Column, Column, Column, Column, Column, Column, Column, Column]

/**
 * A location in a Sudoku board is a unique row, column pair
 */
class Location {
    #row: Digit
    #column: Digit

    constructor(row:Digit, column:Digit) {
        this.#row = row
        this.#column = column
    }

    get row():Digit {
        return this.#row
    }

    get column():Digit {
        return this.#column
    }

    get box(): Digit {
        const inRow1 = this.#row < 4
        const inRow2 = this.#row > 3 && this.#row < 7
        const inRow3 = this.#row > 6 

        const inCol1 = this.#column < 4
        const inCol2 = this.#column > 3 && this.#column < 7
        const inCol3 = this.#column > 6 
        
        if (inRow1 && inCol1) {
            return 1
        } else if (inRow1 && inCol2) {
            return 2
        } else if (inRow1 && inCol3) {
            return 3
        } else if (inRow2 && inCol1) {
            return 4
        } else if (inRow2 && inCol2) {
            return 5
        } else if (inRow2 && inCol3) {
            return 6
        } else if (inRow3 && inCol1) {
            return 7
        } else if (inRow3 && inCol2) {
            return 8
        } else {
            return 9
        }
    }

    /**
     * Returns whether this Location is in the same box as the otherLocation
     * @param otherLocation 
     * @returns 
     */
    inSameBox(otherLocation:Location):boolean {
        return this.box == otherLocation.box
    }

    /**
     * Returns whether this Location is in the same row as the otherLocation
     * @param otherLocation 
     * @returns 
     */
    inSameRow(otherLocation:Location): boolean {
        return this.#row == otherLocation.row
    }

    /**
     * Returns whether this Location is in the same column as the otherLocation
     * @param otherLocation 
     * @returns 
     */
    inSameColumn(otherLocation:Location): boolean {
        return this.#column == otherLocation.column
    }
    
    /**
     * Returns whether this Location is in the same row, box, or column as otherLocation
     * If this Location is the same as otherLocation, returns false
     * @param otherLocation 
     * @returns 
     */
    intersects(otherLocation:Location): boolean {
        if (this.equals(otherLocation)) {
            return false
        } else {
            return this.inSameColumn(otherLocation) || this.inSameColumn(otherLocation) || this.inSameBox(otherLocation)
        }

    }
    
    /**
     * Returns whether this Location is is the same as otherLocation
     * @param otherLocation 
     * @returns 
     */
    equals(otherLocation:Location): boolean {
        return this.inSameColumn(otherLocation) && this.inSameRow(otherLocation)
    }

    
}

class Board {
    #board: Rows

    constructor() {
        this.#board = Array.from({length: 9}, () => Array.from({length: 9}, () => new Cell()) as Column) as Rows
    }

    /**
     * Returns the Cell at the specified location
     * @param location 
     * @returns 
     */
    get(location: Location): Cell {
        return this.#board[location.row - 1][location.column - 1]
    }

    /**
     * Sets the value at the specified location. 
     * If the value was set, clears value from notepads in the same row, column, or box.
     * Returns a list of locations of invalid entries.
     * @param location 
     * @param value 
     * @returns 
     */
    guess(location:Location, value:Digit):Location[] {
        if (this.get(location).guess(value)) {
            this.clearNotes(location, value)
        }

        return this.check()
    }

    /**
     * Clears notes for the specified value from the same row, column, or box as the specified location
     * @param location 
     * @param value 
     */
    clearNotes(location: Location, value: Digit) {
        this.#board.forEach((row, r) => {
            row.forEach((cell, c) => {
                const otherLocation = new Location(r + 1 as Digit, c + 1 as Digit)
                if (location.intersects(otherLocation)) {
                    cell.removeNote(value)
                }
            })
        })
    }

    /**
     * Sets a value on the board at the specified location, does not allow errors to be made
     * This function is intended to be used for the user to set up their own puzzle to solve
     * @param location 
     * @param value 
     */
    setup(location: Location, value:Digit) {
        if (this.entryIsValid(location, value)) {
            this.get(location).given = value
        }
    }

    /**
     * Toggles the specified note value at the specified location
     * @param location 
     * @param value 
     */
    note(location:Location, value: Digit) {
        this.get(location).note(value)
    }

    /**
     * Returns whether the specified value is a valid entry at the specified location
     * @param location 
     * @param value 
     * @returns 
     */
    entryIsValid(location:Location, value: MaybeDigit): boolean {
        if (value === null) return true

        return this.#board.every((row, r) => {
            return row.every((cell, c) => {
                const otherLocation = new Location (r + 1 as Digit, c + 1 as Digit)

                if (location.inSameRow(otherLocation)) {
                    if (location.inSameColumn(otherLocation)) {
                        // don't check against self
                        return true
                    } else {
                        return value !== cell.value
                    }
                } else if (location.inSameColumn(otherLocation)) {
                    return value !== cell.value
                } else if (location.inSameBox(otherLocation)) {
                    return value !== cell.value
                } else {
                    // not in same row, column, or box
                    return true
                }
            })
        })
    }

    /**
     * Returns a list of locations with invalid entries
     * @returns 
     */
    check():Location[] {
        return this.#board.flatMap((row, r) => {
            return row.map((cell, c) => {
                const location = new Location(r + 1 as Digit, c + 1 as Digit)

                if (!this.entryIsValid(location, cell.value)) {
                    return location
                } else {
                    return null
                }
            })
        }).filter(v => v !== null)
    }
}

export default Board

export { Location }

