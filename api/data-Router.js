const router = require('express').Router()


router.get('/', (req, res) => {
    res.json('data router is UPUPUP')
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage:'something went wrong inside data router',
        stack:err.stack,
        message:err.message,
    })
})

module.exports= router