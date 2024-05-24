const request = require('supertest')
const db = require('../data/db-config')
const server = require('../server.js')
const User = require('./users-model.js')

const user1 = {first_name:'zokiPoki', last_name:'zochoski'}
const user2 = {first_name:'zokiPokiMOki', last_name:'Blochkoski'}

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

describe('users model functions', ()=>{
    describe('create a new user', () => {
        test('adds a new user to the database',async ()=>{
            let users 
            await User.createUser(user1)
            users = await db('users')
            expect(users).toHaveLength(1)

            await User.createUser(user2)
            users = await db('users')
            expect(users).toHaveLength(2)
        })
    })
})
