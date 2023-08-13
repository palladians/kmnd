import React from 'react'
import { Spinner, Alert } from '@inkjs/ui'
import { useAppStore } from '../store/app'
import { shallow } from 'zustand/shallow'
import { Box } from 'ink'

export const Output = () => {
  const { output, error, executing } = useAppStore(
    (state) => ({
      output: state.output,
      error: state.error,
      executing: state.executing
    }),
    shallow
  )
  return executing ? (
    <Spinner label="Executing" />
  ) : error ? (
    error && <Alert variant="error">{error}</Alert>
  ) : (
    output && <Alert variant="info">{output}</Alert>
  )
}
