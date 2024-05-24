const request = require('supertest')
const db = require('../data/db-config')
const server = require('../server.js')
const User = require('./users-model.js')

const user1 = { first_name: 'zokiPoki', last_name: 'zochoski' }
const user2 = { first_name: 'zokiPokiMOki', last_name: 'Blochkoski' }

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db("users").truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('correct env var', () => {
    test('correct env var', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})

describe('users model functions', () => {
    describe('create a new user', () => {
        test('adds a new user to the database', async () => {
            let users
            await User.createUser(user1)
            users = await db('users')
            expect(users).toHaveLength(1)

            await User.createUser(user2)
            users = await db('users')
            expect(users).toHaveLength(2)
        })
        test('adds user with first_name and last_name ', async () => {
            const user = await User.createUser(user1)
            expect(user).toMatchObject({ user_id: 1, first_name: 'zokiPoki', last_name: 'zochoski' })
        })
    })
    describe('[DELETE] / deletes the user', () => {
        test('removes the user from database', async () => {
            const [user_id] = await db('users').insert(user1)
            let user = await db('users').where({ user_id }).first()
            expect(user).toBeTruthy()
            await request(server).delete('/users/' + user_id)
            user = await db('users').where({ user_id }).first()
            expect(user).toBeFalsy()
        })
        test('respond with the deleted user', async () => {
            await db('users').insert(user1)
            let user = await request(server).delete('/users/1')
            expect(user.body).toMatchObject(user1)
        })
    })
    describe('[GET] user with a given id', () => {
        test('gets the user by his id', async () => {
            await db('users').insert(user1)
            let res = await request(server).get('/users/1')
            expect(res.body).toEqual({ user_id:1, ...user1})
        })
        test('responds with the right status code', async () => {
            await db('users').insert(user1)
            const res = await request(server).get('/users/1')
            expect(res.status).toBe(200);
        })
        test('responds with the right message if invalid ID', async () => {
            const res = await request(server).get('/users/999')
            expect(res.status).toBe(404);
            expect(res.body.message).toBe(`ID 999 is invalid!`)
        })
    })
})
