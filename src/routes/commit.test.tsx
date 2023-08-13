import React from 'react'
import { render } from 'ink-testing-library'
import { CommitRoute } from './commit'

it('renders commit type selection', () => {
  const { lastFrame } = render(<CommitRoute />)
  const frame = lastFrame()
  expect(frame).toContain('Commit Type')
})
