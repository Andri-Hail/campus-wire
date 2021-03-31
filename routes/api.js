const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const router = express.Router()

router.get('/', isAuthenticated, async (req, res) => {
  res.send('questions here')
})

router.post('/add', isAuthenticated, async (req, res) => {
  const { questionText, author } = req.body
  try {
    await Question.create({ questionText, author })
    res.send('Created question')
  } catch {
    res.send(`Couldn't create a question`)
  }
})

router.post('/answer', isAuthenticated, async (req, res) => {
  const { username } = req.session
  const { answer, _id } = req.body

  try {
    await Question.findOneAndUpdate({ _id }, { answer: answer })
    res.send('Answer is updated')
  } catch {
    res.send('answer could not update')
  }
})

module.exports = router
