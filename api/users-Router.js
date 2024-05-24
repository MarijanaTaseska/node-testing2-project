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

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const delUser = await Users.deleteUser(id)
  res.status(200).json(delUser)
})

router.get('/:id', async (req, res, next) => {
  const id  = req.params.id
  try {
    const user = await Users.getById(id)
    if (!user) {
      res.status(404).json({ message: `ID ${id} is invalid!` })
    } else {
      res.status(200).json(user)
      console.log(user)
    }
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: 'something went wrong inside data router',
    stack: err.stack,
    message: err.message,
  })
})

module.exports = router