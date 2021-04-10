import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import Signup from './Signup'
import Login from './Login'
import Questions from './Questions'

const App = () => (
  <div>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="api/questions">
        <Questions />
      </Route>
      <Route path="/">
        <Questions />
      </Route>
    </Switch>
  </div>
)

export default App
