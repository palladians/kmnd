import React from 'react'
import { render } from 'ink-testing-library'
import { Output } from './Output'
import { useAppStore } from '../store/app'
import { renderHook, act } from '@testing-library/react'

it('renders output component with stdout', () => {
  const { result } = renderHook(() => useAppStore())
  act(() => {
    result.current.setOutput('done')
  })
  const { lastFrame } = render(<Output />)
  const frame = lastFrame()
  expect(frame).toContain('done')
})

it('renders output component with error', () => {
  const { result } = renderHook(() => useAppStore())
  act(() => {
    result.current.setError('error')
  })
  const { lastFrame } = render(<Output />)
  const frame = lastFrame()
  expect(frame).toContain('error')
})
