import React from 'react'
import { render } from 'ink-testing-library'
import { OverviewRoute } from './overview'
import { gitCommands } from '../commands/git'
import { createAppCommands } from '../commands/create-app'

it('renders overview options count', () => {
  const { lastFrame } = render(<OverviewRoute />)
  const frame = lastFrame()
  expect(frame).toContain('Results (9)')
})

it('renders overview commands search', () => {
  const { lastFrame } = render(<OverviewRoute />)
  const frame = lastFrame()
  expect(frame).toContain('earch for commands')
})

it('renders overview git commands', () => {
  const { lastFrame } = render(<OverviewRoute />)
  const frame = lastFrame()
  gitCommands.forEach((command) => {
    expect(frame).toContain(command.label)
  })
})

it('renders overview create app commands', () => {
  const { lastFrame } = render(<OverviewRoute />)
  const frame = lastFrame()
  createAppCommands.forEach((command) => {
    expect(frame).toContain(command.label)
  })
})
