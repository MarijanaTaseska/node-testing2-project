const router = require('express').Router()
const Users = require('./users-model')

router.get('/', async (req, res) => {
   await Users.getAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to fetch all users' });
    })
})

router.get('/:id', async (req, res, next) => {
  const {id} = req.params
  try{
    const user = await Users.getById(id)
    if(!user){
      res.json({message:`ID ${id} is invalid!`})
      }else{
        res.json(user)
    }
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage:'something went wrong inside data router',
        stack:err.stack,
        message:err.message,
    })
})

module.exports= router