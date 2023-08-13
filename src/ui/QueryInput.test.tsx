import React from 'react'
import { render } from 'ink-testing-library'
import { QueryInput } from './QueryInput'

it('renders query input component', () => {
  const { lastFrame } = render(<QueryInput />)
  const frame = lastFrame()
  expect(frame).toContain('earch for commands')
})
