const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})

    const userObject = helper.initialUsers.map(u => User(u))
    const promiseArray = userObject.map(u => u.save())
    await Promise.all(promiseArray)
})

describe('addition of a new user', () => {
    test('whose username is missing ends with a bad request', async () => {
        const userWithMissingUsername = {
            name: 'Cvorak',
            password: 'cvorak'
        }

        const result = await api
            .post('/api/users')
            .send(userWithMissingUsername)
            .expect(400)

        expect(result.body.error).toContain('Path `username` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('whose username is shorter than 3 chars ends with a bad request', async () => {
        const userWithShortUsername = {
            username: 'cv',
            password: 'cvorak',
            name: 'nikola'
        }

        const result = await api
            .post('/api/users')
            .send(userWithShortUsername)
            .expect(400)

        expect(result.body.error).toContain('`username` (`cv`) is shorter than the minimum allowed length (3)')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)

    })

    test('whose password is shorter than 3 chars ends with a bad request', async () => {
        const userWithShortUsername = {
            username: 'cvorak',
            password: 'cv',
            name: 'nikola'
        }

        const result = await api
            .post('/api/users')
            .send(userWithShortUsername)
            .expect(400)
        
        expect(result.body.error).toEqual('password must be given and longer than 3 chars')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })

    test('whose password is missing ends with a bad request', async () => {
        const userWithShortUsername = {
            username: 'cvorak',
            name: 'nikola'
        }

        const result = await api
            .post('/api/users')
            .send(userWithShortUsername)
            .expect(400)

        expect(result.body.error).toEqual('password must be given and longer than 3 chars')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})