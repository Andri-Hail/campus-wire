import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import Questions from './Questions'

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/question">
          <Questions />
        </Route>
        <Route path="/">
          <Questions />
        </Route>
      </Switch>
    </div>
  )
}

export default App
