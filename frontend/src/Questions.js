import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import SingleQ from './SingleQ'

const Questions = () => {
  let login
  const [disp, setDisp] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(async () => {
    const { data } = await axios.get('/question/')
    const response = axios.post('question/isauthenticated/')
    const {
      data2: { user },
    } = response
    console.log(user)

    const dispQs = data.map(q => (
      <SingleQ
        questionText={q.questionText}
        questionAuthor={q.author}
        answer={q.answer}
        _id={q._id}
      />
    ))
    setDisp(dispQs)
  })
  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  const addQuestion = async () => {
    const { status } = await axios.post('/question/add', {
      questionText,
      author,
    })
  }

  return (
    <div>
      <button onClick={showModal}>Add new question</button>
      <Modal animation={false} show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>What&apos;s your question?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            onChange={e => setQuestionText(e.target.value)}
            placeholder="ask away"
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button>
          <button onClick={() => addQuestion(questionText, author)}>
            Post
          </button>
        </Modal.Footer>
      </Modal>
      {disp}
    </div>
  )
}

export default Questions
