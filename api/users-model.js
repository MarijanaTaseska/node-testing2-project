const db = require('../data/db-config')

function getAll(){
    return db('users')
}

function getById(user_id){
    return db('users').where('user_id', user_id).first()
}

module.exports={
    getAll,
    getById
}