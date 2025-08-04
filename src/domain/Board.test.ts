import { Digit, MaybeDigit } from "@/types"
import { getRandomDigit } from "@/utilities"
import Board, { Location } from "./Board"


describe('SudokuBoard', () => {
    let board: Board

    beforeEach(() => {
        board = new Board()
    })

    it('Set a guess by coordinates', () => {
        const row: Digit = getRandomDigit()
        const column: Digit = getRandomDigit()
        const location = new Location(row, column)
        const value: MaybeDigit = getRandomDigit()

        board.guess(location, value)
        
        const result = board.get(location)

        expect(result.value).toEqual(value)
        expect(result.given).toBe(false)
    })

    it('Set a note by coordinates', () => {
        const row: Digit = getRandomDigit()
        const column: Digit = getRandomDigit()
        const location = new Location(row, column)
        const noteValue: MaybeDigit = getRandomDigit()

        board.note(location, noteValue)

        const result = board.get(location)

        expect(result.notepad.every((note, i) => i + 1 === noteValue ? note : !note))
    })

    it('Setup a given cell by coordinates', () => {
        const row: Digit = getRandomDigit()
        const column: Digit = getRandomDigit()
        const location = new Location(row, column)
        const value: MaybeDigit = getRandomDigit()

        board.setup(location, value)
        
        const result = board.get(location)

        expect(result.value).toEqual(value)
        expect(result.given).toBe(true)
    })

    it('Clear notes', () => {
        const row = getRandomDigit()
        const column = getRandomDigit()
        const location = new Location(row, column)
        const noteValue = getRandomDigit()
        
        const otherLocationsSameBox = []
        while (otherLocationsSameBox.length < 2) {
            const newLocation = new Location(getRandomDigit(), getRandomDigit())

            if (location.inSameBox(newLocation)) {
                otherLocationsSameBox.push(newLocation)
            }
        }

        const otherLocationsThatShouldBeCleared = [
            new Location(row, getRandomDigit()),
            new Location(row, getRandomDigit()),
            new Location(getRandomDigit(), column),
            new Location(getRandomDigit(), column),
            ...otherLocationsSameBox
        ]

        const otherLocationsThatShouldNotBeCleared = []
        while (otherLocationsThatShouldNotBeCleared.length < 6) {
            const newLocation = new Location(getRandomDigit(), getRandomDigit())
            if (!location.equals(newLocation) && !location.intersects(newLocation)) {
                otherLocationsThatShouldNotBeCleared.push(newLocation)
            }
        }

        const notesToAdd = [
            location,
            ...otherLocationsThatShouldBeCleared,
            ...otherLocationsThatShouldNotBeCleared
        ]

        notesToAdd.forEach(location => board.note(location, noteValue))

        board.clearNotes(location, noteValue)

        // clearNotes does not modify the notepad at location
        expect(board.get(location).notepad[noteValue - 1]).toBe(true)

        // clearNotes removes notes from each intersecting location
        const clearedNotes = otherLocationsThatShouldBeCleared.map(location => {
            return board.get(location).notepad[noteValue -1]
        })
        expect(clearedNotes.every(note => !note)).toBe(true)

        // clearNotes does not modify notes in non-intersecting locations
        const unmodifiedNotes = otherLocationsThatShouldNotBeCleared.map(location => {
            return board.get(location).notepad[noteValue -1]
        })
        expect(unmodifiedNotes.every(note => note)).toBe(true)




    })

    


})