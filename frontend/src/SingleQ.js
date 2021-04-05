import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Signup from './Signup'
import Login from './Login'

const SingleQ = props => {
  const { questionText, author, _id } = props
  const [answer, setAnswer] = useState(props.answer)
  const [newAnswer, setNewAnswer] = useState('')

  const updateAnswer = async () => {
    await axios.post('/question/answer', {
      answer,
      _id,
    })
    setAnswer(newAnswer)
    setNewAnswer('')
  }

  return (
    <div className="question">
      <h3>{questionText}</h3>
      <h4 style={{ float: 'right' }}>
        Author:
        {author}
      </h4>

      <p>{answer}</p>
      <input
        value={newAnswer}
        onChange={e => setNewAnswer(e.target.value)}
        placeholder="update answer"
      />
      <button onClick={() => updateAnswer(answer, _id)}>Post</button>
    </div>
  )
}

export default SingleQ
