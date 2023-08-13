import React from 'react'
import { useExecute } from './hooks/useExecute'
import { Router } from './router'

const App = () => {
  useExecute()
  return <Router />
}

export default App
