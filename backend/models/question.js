const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  answer: { type: String, default: '' },
  author: { type: String, required: true },
})

module.exports = model('Question', questionSchema)
