import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import './App.css'
import Login from './Login'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const history = useHistory()

  const signup = async () => {
    const { status } = await axios.post('/account/signup', {
      username,
      password,
    })
    if (status === 200) {
      setMsg('success!')
      history.push('/login')
    } else {
      setMsg('failed!')
    }
  }

  return (
    <div className="login">
      <img src="logo.jpg" alt="logo" />

      <br />
      <br />
      <input
        onChange={e => setUsername(e.target.value)}
        placeholder="username"
      />
      <br />
      <br />
      <input
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
      />
      <br />
      <br />
      <button onClick={() => signup(username, password)}> Register </button>
      <br />
      <br />

      <p>{msg}</p>
      <Link to="/login">login instead</Link>
      <Route path="/login">
        <Login />
      </Route>
    </div>
  )
}

export default Signup
