import { NotePad } from "./domain/Cell";
import { Digit } from "./types";

/**
 * Generates a new notepad
 * @returns 
 */
const getNewNotePad = ():NotePad => [false, false, false, false, false, false, false, false, false] as NotePad

/**
 * Generates a psuedo-random Digit value
 * @returns 
 */
const getRandomDigit = ():Digit => {
    const min = 1
    const max = 9
    return Math.floor(Math.random() * (max - min + 1)) + min as Digit
}

export { getNewNotePad, getRandomDigit };
