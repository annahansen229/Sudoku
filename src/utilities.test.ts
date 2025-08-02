import {expect, jest, test} from '@jest/globals';
import { getNewNotePad } from './utilities';

describe('utilities', () => {
    it('getNewNotePad', () => {
        const result = getNewNotePad()
        expect(result).toHaveLength(9)
        expect(result.every(value => !value))
    })
})