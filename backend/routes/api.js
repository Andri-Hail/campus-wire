const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const fullUser = require('../middlewares/fullUser')

const Question = require('../models/question')

const router = express.Router()

router.get('/', isAuthenticated, async (req, res) => {
  Question.find({}).then(question => {
    res.send(question)
  })
})

router.post('/add', isAuthenticated, async (req, res) => {
  const { questionText, author } = req.body
  try {
    await Question.create({ questionText, author })
    res.send('Created question')
  } catch {
    res.send("Couldn't create a question")
  }
})

router.post('/isauthenticated', isAuthenticated, async (req, res) => {
  res.json({ user: req.session.username })
})

router.post('/answer', isAuthenticated, async (req, res) => {
  const { username } = req.session
  const { answer, _id } = req.body

  try {
    await Question.findOneAndUpdate({ _id }, { answer })
    res.send('Answer is updated')
  } catch {
    res.send('answer could not update')
  }
})

module.exports = router
