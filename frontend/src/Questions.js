import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom'
import './App.css'
import Login from './Login'
import SingleQ from './SingleQ'
import logo from './logo.png'

const Questions = () => {
  const [disp, setDisp] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [author, setAuthor] = useState('')
  const [user, setUser] = useState('')
  useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data } = await axios.get('http://localhost:3000/api/questions')
      const res = await axios.post(
        'http://localhost:3000/api/questions/isauthenticated'
      )
      setUser(res.data.user)
      setAuthor(res.data.user)
      const dispQs = data.map(q => (
        <SingleQ
          questionText={q.questionText}
          questionAuthor={q.author}
          answer={q.answer}
          _id={q._id}
          key={q._id}
        />
      ))
      setDisp(dispQs)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [author, user])

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  const addQuestion = async () => {
    await axios.post('http://localhost:3000/api/questions/add', {
      questionText,
      author,
    })
    setIsOpen(false)
  }
  const logout = async () => {
    await axios.post('/account/logout')
  }

  if (user === '' || user === undefined) {
    return (
      <div>
        <Link to="/login">Login here</Link>
        <Route path="/login ">
          <Login />
        </Route>
        <br />
        <img src={logo} alt="logo" width="20%" style={{ marginLeft: '40%' }} />

        {disp}
      </div>
    )
  }
  return (
    <div>
      <p>
        Hello &nbsp;
        {user}
        <button
          className="btn btn-danger"
          style={{ float: 'right' }}
          onClick={() => logout(user)}
        >
          Logout
        </button>
      </p>
      <button className="addQuestion" onClick={showModal}>
        Add new question
      </button>
      <br />
      <br />

      <Modal animation={false} show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>What&apos;s your question?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="addAnswer"
            style={{ width: '90%', borderBottom: '1px solid black' }}
            onChange={e => setQuestionText(e.target.value)}
            placeholder="ask away"
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={hideModal}>
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={() => addQuestion(questionText, author)}
          >
            Post
          </button>
        </Modal.Footer>
      </Modal>
      <br />
      <img src={logo} alt="logo" width="20%" style={{ marginLeft: '40%' }} />

      {disp}
    </div>
  )
}

export default Questions
