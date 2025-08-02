import Cell from "./Cell";
import {expect, jest, test} from '@jest/globals';
import * as utilities from "../utilities";
import { Digit, MaybeDigit } from "../types";

describe('Cell', () => {
    let cell: Cell

    beforeEach(() => {
        cell = new Cell()
    })

    it('Initializes with expected attribute values', () => {
        expect(cell.given).toBe(false)
        expect(cell.value).toBeNull()
        expect(cell.notepad.every(note => !note))
    })

    it('set given with Digit', () => {
        const value:MaybeDigit = 7
        cell.given = value

        // a Digit value sets given flag as true
        expect(cell.given).toBe(true)

        // value was set
        expect(cell.value).toEqual(value)
    })

    it('set given with null', () => {
        // set up: set a digit guess
        const digitValue:MaybeDigit = 7
        cell.given = digitValue

        // test: set a null guess
        const nullValue:MaybeDigit = null
        cell.given = nullValue
        
        // a null value sets given flag as false
        expect(cell.given).toBe(false)

        // value was set
        expect(cell.value).toEqual(nullValue)
    })

    it('set guess with Digit', () => {
        // set up: establishing a note state
        cell.note(1)
        cell.note(2)
        cell.note(3)

        
        // test - set a digit guess
        const value = 9
        const result = cell.guess(value)
        
        // successful guess returns true
        expect(result).toBe(true)

        // value was set
        expect(cell.value).toEqual(value)
        
        // given is not changed
        expect(cell.given).toBe(false)

        // notepad is cleared
        expect(cell.notepad.every(note => !note)).toBe(true)
    })

    it('set guess with null', () => {
        // set up: establishing a note state
        cell.note(1)
        cell.note(2)
        cell.note(3)
        
        // test - set a digit guess
        const value = null
        const result = cell.guess(value)
        
        // successful guess returns true
        expect(result).toBe(true)

        // value was set
        expect(cell.value).toEqual(value)

        // given is not changed
        expect(cell.given).toBe(false)

        // notepad is cleared
        expect(cell.notepad.every(note => !note)).toBe(true)
    })

    it('Cannot set a guess a given cell', () => {
        // set up: set a given value
        const givenValue = 3
        cell.given = givenValue

        // test - make a guess
        const result = cell.guess(4)

        // failed guess returns false
        expect(result).toBe(false)

        // value is not changed
        expect(cell.value).toEqual(givenValue)
    })

    // value getter covered by other tests

    // given getter covered by other tests

    it('notepad getter returns the #notepad value', () => {
        const noteValues = [1, 2, 3]
        noteValues.forEach(value => cell.note(value as Digit))
        expect(cell.notepad.every((note, i) => noteValues.includes(i + 1) ? note : !note)).toBe(true)
    })

    it('note method toggles notes on/off', () => {
        // set a note value - it's index is toggled true, other notes remain off
        const firstNote = 1
        cell.note(firstNote)

        // index of note is toggled on, other notes remain off
        expect(cell.notepad.every((note, i) => i + 1 == firstNote ? note : !note)).toBe(true)
        
        // set another note value - first note is still true, second note is true, other notes remain off
        const secondNote = 4
        cell.note(secondNote)
        expect(cell.notepad.every((note, i) => [firstNote, secondNote].includes(i + 1) ? note : !note)).toBe(true)

        // set the firstNote value again - it's index is toggled false, other notes are unchanged
        cell.note(firstNote)
        expect(cell.notepad.every((note, i) => i + 1 == secondNote ? note : !note)).toBe(true)
    })

    it('removeNote', () => {
        // set up: establish a note state
        const firstNote = 1
        const secondNote = 4

        cell.note(firstNote)
        cell.note(secondNote)

        // test - call removeNote
        // indicated note is toggled false
        // other note is not affected
        cell.removeNote(firstNote)
        expect(cell.notepad.every((note, i) => i + 1 == secondNote ? note : !note)).toBe(true)
        
        // call removeNote again
        // there is no change in the notepad
        cell.removeNote(firstNote)
        expect(cell.notepad.every((note, i) => i + 1 == secondNote ? note : !note)).toBe(true)

    })



    

})