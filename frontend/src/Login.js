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
import Signup from './Signup'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const history = useHistory()
  //   useEffect(async () => {
  //     const { data } = await axios.get('/')
  //     setMsg(data.title)
  //   }, [])

  const signup = async () => {
    const { status } = await axios.post('/account/signup', {
      username,
      password,
    })
    if (status === 200) {
      setMsg('success!')
    } else {
      setMsg('failed!')
    }
  }
  const login = async () => {
    const { data } = await axios.post('/account/login', {
      username,
      password,
    })

    if (data === 'logged in') {
      history.push('/question')
    } else {
      alert('wrong username or password!')
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
      <button onClick={() => login(username, password)}> Login </button>
      <br />
      <br />

      <p>{msg}</p>
      <Link to="/signup">sign up instead</Link>
      <Route path="/signup">
        <Signup />
      </Route>
    </div>
  )
}

export default Login
