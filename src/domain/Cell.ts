import { getNewNotePad } from "@/utilities";
import { Digit, MaybeDigit } from "../types";

/**
 * A 9-tuple of bool represents a notepad. If an entry is true, that value is entered in the notepad. If an entry is false, that value is not entered in the notepad.
 */

export type NotePad = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean]

/**
 * A Cell has a value which may be given, else it is a guess, and a notepad
 */

export class Cell {
    #given: boolean;
    #value: MaybeDigit;
    #notepad: NotePad;

    constructor() {
        this.#value = null
        this.#given = false
        this.#notepad = getNewNotePad()
    }

    /**
     * Sets a given value in the cell.
     * When newValue is null, clears the given flag.
     * It is assumed this function will only be used in setup mode, therefore, setting a value to null means resetting the cell to the starting point.
     * @param newValue 
     */
    set given(newValue: MaybeDigit) {
        this.#value = newValue
        this.#given = (newValue !== null)
    }

    /**
     * Sets a guess value in the cell. Clears the notepad. Given cells cannot be set using guess. returns false if set operation fails
     * @param value 
     */
    guess(newValue: MaybeDigit):boolean {
        if (!this.given) {
            this.#value = newValue
            this.#notepad = [false, false, false, false, false, false, false, false, false] as NotePad
            return true
        } 

        return false
    }

    get value(): MaybeDigit {
        return this.#value
    }

    get given(): boolean {
        return this.#given
    }

    get notepad(): NotePad {
        return this.#notepad
    }

    /**
     * Toggles note on/off
     */
    note(newNote:Digit) {
        if (!this.given) {
            this.#notepad[newNote - 1] = !this.#notepad[newNote - 1]
        }
    }

    /**
     * Removes note from notepad
     */
    removeNote(note:Digit){
        if (!this.given) {
            this.#notepad[note - 1] = false
        }
    }
}

export default Cell