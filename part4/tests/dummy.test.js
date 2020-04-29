const dummy = require('../utils/list_helper').dummy

test('dummy returns 1', () => {
    const blogs = []

    const result = dummy(blogs)
    expect(dummy(result)).toBe(1)
})