const express = require('express')
const server = express()
const dataRouter = require('./api/data-Router')

server.use(express.json())
server.use('/data', dataRouter)

module.exports= server


