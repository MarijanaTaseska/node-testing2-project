const router = require('express').Router()
const Users = require('./users-model')

router.get('/', (req, res) => {
    Users.getAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get users' });
    })
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage:'something went wrong inside data router',
        stack:err.stack,
        message:err.message,
    })
})

module.exports= router