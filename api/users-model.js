const db = require('../data/db-config')

function getAll() {
    return db('users')
}

async function getById(id) {
    const user = await db('users').where('user_id', id).first()
    return user
}

async function createUser(user) {
    const [id] = await db('users').insert(user)
    return db('users').where('user_id', id).first()
}

async function deleteUser(id) {
    const user = await db('users').where('user_id', id).first()
    await db('users').where('user_id', id).del()
    return user
}

module.exports = {
    getAll,
    getById,
    createUser,
    deleteUser,
}
