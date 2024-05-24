const router = require('express').Router()


router.get('/', (req, res, next) => {
    res.json('data router is UPUPUP')
})

module.exports= router