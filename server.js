const express = require('express')
const server = express()
const usersRouter = require('./api/users-Router')

server.use(express.json())
server.use('/users', usersRouter)

module.exports= server


