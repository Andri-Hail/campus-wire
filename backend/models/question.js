const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  answer: { type: String, default: '' },
  author: String,
})

module.exports = model('Question', questionSchema)
