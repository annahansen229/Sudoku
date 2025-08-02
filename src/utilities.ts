import { NotePad } from "./domain/Cell";

/**
 * Generates a new notepad
 * @returns 
 */
const getNewNotePad = ():NotePad => [false, false, false, false, false, false, false, false, false] as NotePad

export {getNewNotePad}