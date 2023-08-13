import React from 'react'
import { useExecute } from './hooks/useExecute'
import { Router } from './router'
import { useAppStore } from './store/app'
import { shallow } from 'zustand/shallow'

const App = () => {
  useExecute()
  const { executing } = useAppStore(
    (state) => ({ executing: state.executing, setQuery: state.setQuery }),
    shallow
  )
  return executing ? null : <Router />
}

export default App
