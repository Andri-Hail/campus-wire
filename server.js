const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')

const AccountRouter = require('./routes/account')
const QuestionRouter = require('./routes/api')

const app = express()

const MONGO_URI = 'mongodb://localhost:27017/test-2'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(
  cookieSession({
    name: 'session',
    keys: ['notRandom'],
    maxAge: 20000,
  })
)
app.use(express.json())

app.use('/account', AccountRouter)
app.use('/question', QuestionRouter)

app.get('/', (req, res) => {
  res.send(`Welcome ${req.session.username}`)
})
app.listen(3000, () => {
  console.log('listening on 3000')
})
