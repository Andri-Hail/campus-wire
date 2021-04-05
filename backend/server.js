const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const path = require('path')

const AccountRouter = require('./routes/account')
const QuestionRouter = require('./routes/api')
const isAuthenticated = require('./middlewares/isAuthenticated')

const app = express()

const MONGO_URI = 'mongodb://localhost:27017/test-2'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
app.use(express.static('dist'))
app.use(
  cookieSession({
    name: 'session',
    keys: ['notRandom'],
    maxAge: 2000000,
  }),
)
app.use(express.json())

app.use('/account', AccountRouter)
app.use('/question', QuestionRouter)

app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})
app.listen(3000, () => {
  console.log('listening on 3000')
})
