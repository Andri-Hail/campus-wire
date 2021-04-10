import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Collapse from 'react-bootstrap/Collapse'
import './App.css'

const SingleQ = props => {
  const { questionText, questionAuthor, _id } = props
  // eslint-disable-next-line react/destructuring-assignment
  const [answer, setAnswer] = useState(props.answer)
  const [newAnswer, setNewAnswer] = useState('')
  const [user, setUser] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(async () => {
    const res = await axios.post('http://localhost:3000/api/questions/isauthenticated')
    setUser(res.data.user)
  })

  const updateAnswer = async () => {
    await axios.post('http://localhost:3000/api/questions/answer', {
      answer,
      _id,
    })
    setAnswer(newAnswer)
    setNewAnswer('')
  }
  if (user === '' || user === undefined) {
    return (
      <div className="question">
        <h4>
          {questionText}
          <span style={{ float: 'right' }}>
            Author:
            {questionAuthor}
          </span>
        </h4>
        <p>{answer}</p>
      </div>
    )
  }
  return (
    <div className="question">
      <h4>
        {questionText}
        <button
          onClick={() => setOpen(!open)}
          aria-controls="post"
          aria-expanded={open}
          className="addAnswer"
        >
          Add Answer
        </button>
        <span style={{ float: 'right' }}>
          Author:
          {questionAuthor}
        </span>
      </h4>
      <p>{answer}</p>
      <Collapse in={open}>
        <div id="post">
          <input
            value={newAnswer}
            onChange={e => setNewAnswer(e.target.value)}
            placeholder="update answer"
            className="inputAnswer"
          />
          <button
            className="btn btn-success"
            onClick={() => updateAnswer(answer, _id)}
          >
            Post
          </button>
        </div>
      </Collapse>
    </div>
  )
}

export default SingleQ
