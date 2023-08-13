import React from 'react'
import { render } from 'ink-testing-library'
import { CommandChoice } from './CommandChoice'

it('renders command choice component', () => {
  const { lastFrame } = render(<CommandChoice />)
  const frame = lastFrame()
  expect(frame).toContain('Git')
})
