const average = require('../utils/for_testing').average

describe('average', () => {
    test('of one value is the value itself', () => {
        expect(average([1])).toBe(1)
    })

    test('of meny is calculated right', () => {
        expect(average([ 2, 3, 4, 5, 6])).toBe(4)
    })

    test('of an empty array is zero', () => {
        expect(average([])).toBe(0)
    })
})