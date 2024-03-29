const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Question = require('../models/question')

const router = express.Router()

router.get('/questions', async (req, res) => {
  Question.find({}).then(question => {
    res.send(question)
  })
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
  const { questionText, author } = req.body
  try {
    await Question.create({ questionText, author })
    res.send('Created question')
  } catch {
    res.send("Couldn't create a question")
  }
})

router.post('/questions/isauthenticated', async (req, res) => {
  res.json({ user: req.session.username })
})

router.post('/questions/answer', isAuthenticated, async (req, res) => {
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
